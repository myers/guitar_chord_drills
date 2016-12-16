import { put } from 'redux-saga/effects'

import { micEnumerationResult, micStarted } from './actions'

export default class UserAudio {
  // enumerateDevices at setup, record in store if we have mic permissions yet
  // if we do just start listening on previous mic (get from localStorage)
  // if not wait for requestMic to be called
  // when mic is gotten record it's label in localStorage
  constructor (localStorage=window.localStorage) {
    //console.log('new UserAudio')
    this.monitorNodes = []
    this.sourceElements = {}
    this.audioContext = new window.AudioContext()
    this.currentSource = null
    this.setupRun = false
    this.localStorage = localStorage
  }


  addMonitor (bufferSize, func) {
    const node = this.audioContext.createScriptProcessor(bufferSize)
    node.onaudioprocess = func

    node.connect(this.audioContext.destination)
    this.monitorNodes.push(node)
  }

  removeMonitor (func) {
    const idx = this.monitorNodes.findIndex((el) => (el.onaudioprocess === func))
    this.monitorNodes[idx].disconnect()
    this.monitorNodes.splice(idx, 1);
  }

  *setup () {
    console.log('setup started')
    if (this.setupRun) return

    this.setupRun = true
    let devices = yield navigator.mediaDevices.enumerateDevices()

    const recentMicrophoneLabel = this.localStorage.getItem("recentMicrophoneLabel")
    const device = devices.find((device) => device.label === recentMicrophoneLabel)
    if (device) {
      yield this.activateMic(device.deviceId)
    }
  }

  *playSound (action) {
    let {mediaEl} = action.payload
    let src = mediaEl.getAttribute('src')
    if (!this.sourceElements.hasOwnProperty(src)) {
      this.sourceElements[src] = this.audioContext.createMediaElementSource(mediaEl)
      mediaEl.addEventListener('play', (event) => this.onPlay(this.sourceElements[src]))
    }
    mediaEl.play()
  }

  *activateMic (deviceId) {
    try {
      // cannot use the call() helper here.  I think this must be called as direct result of a users click
      let constraints = {audio: true}
      if (deviceId) {
        constraints.audio = { deviceId }
      }
      const mediaStream = yield navigator.mediaDevices.getUserMedia(constraints)
      const mediaStreamSourceNode = this.audioContext.createMediaStreamSource(mediaStream)
      this.onPlay(mediaStreamSourceNode)
      const micLabel = mediaStream.getTracks()[0].label
      this.localStorage.setItem('recentMicrophoneLabel', micLabel)
      yield put(micStarted(micLabel))
      yield this.updateDeviceList()
    } catch (e) {
      // yield put()
      console.error(e)
    }
  }

  *updateDeviceList () {
    let devices = yield navigator.mediaDevices.enumerateDevices()
    console.log('got devices', devices)
    devices = devices.filter((device) => { if (device.kind === 'audioinput') return true })
    yield put(micEnumerationResult(devices))
  }

  onPlay (sourceNode) {
    if (this.currentSource) {
      this.currentSource.disconnect()
    }
    this.currentSource = sourceNode
    for (let node of this.monitorNodes) {
      sourceNode.connect(node)
    }
    sourceNode.connect(this.audioContext.destination)
  }
}

import { put } from 'redux-saga/effects'

import { micEnumerationResult, micStarted } from './actions'

export default class UserAudio {
  constructor () {
    console.log('new UserAudio')
    this.monitorNodes = []
    this.sourceElements = {}
    this.audioContext = new window.AudioContext()

    this.currentSource = null
  }

  addMonitor (bufferSize, func) {
    console.log('addMonitor', func)
    const node = this.audioContext.createScriptProcessor(bufferSize)
    node.onaudioprocess = func

    node.connect(this.audioContext.destination)
    this.monitorNodes.push(node)
  }

  removeMonitor (func) {
    console.log('removeMonitor', func)
    const idx = this.monitorNodes.findIndex((el) => (el.onaudioprocess === func))
    this.monitorNodes[idx].disconnect()
    this.monitorNodes.splice(index, 1);
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

  *beSilly () {
    let devices = yield navigator.mediaDevices.enumerateDevices()
    console.log('got devices silly', JSON.stringify(devices))
  }

  *requestMic (action) {
    let { deviceId } = action.payload
    console.log('mic requested', deviceId)
    try {
      yield this.beSilly()

      // cannot use the call() helper here.  I think this must be called as direct result of a users click
      let constraints = {audio: true}
      if (deviceId) {
        constraints.audio = { deviceId }
      }
      const mediaStream = yield navigator.mediaDevices.getUserMedia(constraints)

      const mediaStreamSourceNode = this.audioContext.createMediaStreamSource(mediaStream)
      this.onPlay(mediaStreamSourceNode)
      console.log('got mediaStream', mediaStream)
      console.log(mediaStream.getTracks())

      yield put(micStarted(mediaStream.getTracks()[0].label))
      let devices = yield navigator.mediaDevices.enumerateDevices()
      console.log('got devices', devices)
      devices = devices.filter((device) => { if (device.kind === 'audioinput') return true })
      yield put(micEnumerationResult(devices))
    } catch (e) {
      // yield put()
      console.error(e)
    }
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

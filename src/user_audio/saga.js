import { MONITOR_ADD, SOUND_PLAY, MIC_REQUEST, micEnumerationResult, micStarted } from './actions'
import { takeEvery } from 'redux-saga'
import { put } from 'redux-saga/effects'

class AudioWrapper {
  constructor () {
    console.log('new AudioWrapper')
    this.monitorNodes = []
    this.sourceElements = {}
    this.audioContext = new AudioContext()

    this.currentSource = null
  }

  *addMonitor (action) {
    const {bufferSize, func} = action.payload
    const node = this.audioContext.createScriptProcessor(bufferSize)
    node.onaudioprocess = func

    node.connect(this.audioContext.destination)
    this.monitorNodes.push(node)
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

  *requestMic (action) {
    let { deviceId } = action.payload
    console.log('mic requested', deviceId)
    try {
      // cannot use the call() helper here.  I think this must be called as direct result of a users click
      let constraints = {audio: true}
      if (deviceId) {
        constraints.audio = { deviceId }
      }
      const mediaStream = yield navigator.mediaDevices.getUserMedia(constraints)

      const mediaStreamSourceNode = this.audioContext.createMediaStreamSource(mediaStream)
      this.onPlay(mediaStreamSourceNode)
      console.log('got mediaStream', mediaStream)
      console.log(mediaStream.getTracks()[0].label)

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

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* audioContextSaga () {
  const audioWrapper = new AudioWrapper()
  yield takeEvery(MONITOR_ADD, (action) => audioWrapper.addMonitor(action))
  yield takeEvery(SOUND_PLAY, (action) => audioWrapper.playSound(action))
  yield takeEvery(MIC_REQUEST, (action) => audioWrapper.requestMic(action))
}

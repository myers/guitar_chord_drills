import { MONITOR_ADD, SOUND_PLAY, MIC_REQUEST } from './actions'

import { takeEvery, delay } from 'redux-saga'
import { put } from 'redux-saga/effects'

class AudioWrapper {
  constructor() {
    this.monitorNodes = []
    this.sourceElements = {}
    this.audioContext = new AudioContext()

    this.currentSource = null
  }

  *addMonitor(action) {
    const {bufferSize, func} = action.payload
    const node = this.audioContext.createScriptProcessor(bufferSize)
    node.onaudioprocess = func

    node.connect(this.audioContext.destination)
    this.monitorNodes.push(node)
  }

  *playSound(action) {
    let {mediaEl} = action.payload
    let src = mediaEl.getAttribute('src')
    if (!this.sourceElements.hasOwnProperty(src)) {
      this.sourceElements[src] = this.audioContext.createMediaElementSource(mediaEl)
      mediaEl.addEventListener('play', (event) => this.onPlay(this.sourceElements[src]))
    }
    mediaEl.play()
  }

  *requestMic() {
    const mediaStream = yield call(navigator.mediaDevices.getUserMedia, {audio: true})

  }

  onPlay(sourceNode) {
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
export function* audioContextSaga() {
  const audioWrapper = new AudioWrapper()
  yield takeEvery(MONITOR_ADD, (action) => audioWrapper.addMonitor(action))
  yield takeEvery(SOUND_PLAY, (action) => audioWrapper.playSound(action))
  yield takeEvery(MIC_REQUEST, audioWrapper.requestMic)
}

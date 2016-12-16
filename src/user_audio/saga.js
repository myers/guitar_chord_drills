import { SOUND_PLAY, MIC_REQUEST, micEnumerationResult, micStarted } from './actions'
import { takeEvery, eventChannel, END } from 'redux-saga'
import { put } from 'redux-saga/effects'
import UserAudio from './user_audio'

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
function userAudioSaga (userAudio) {
  function * realSaga() {
    yield takeEvery(SOUND_PLAY, (action) => userAudio.playSound(action))
    yield takeEvery(MIC_REQUEST, (action) => userAudio.requestMic(action))
  }
  return realSaga
}

export default userAudioSaga

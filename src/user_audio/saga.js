import { SOUND_PLAY, MIC_REQUEST, micEnumerationResult, micStarted } from './actions'
import { takeEvery, eventChannel, END } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import UserAudio from './user_audio'

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
function userAudioSaga (userAudio) {
  function * realSaga () {
    yield call(() => userAudio.setup())
    yield takeEvery(SOUND_PLAY, (action) => userAudio.playSound(action))
    yield takeEvery(MIC_REQUEST, (action) => {
      const { deviceId } = action.payload
      return userAudio.activateMic(deviceId)
    })
  }
  return realSaga
}

export default userAudioSaga

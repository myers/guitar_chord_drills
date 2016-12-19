import { SOUND_PLAY, MIC_REQUEST } from './actions'
import { takeEvery } from 'redux-saga'
import { call } from 'redux-saga/effects'

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

import * as actions from './actions'

const initalState = {
  listening: false,
  micLabel: '',
  mics: [],
  needPermission: true
}

const userAudioReducer = (state = initalState, action) => {
  let newState = {}

  Object.assign(newState, state)
  switch (action.type) {
    case actions.MIC_ENUMERATION_RESULT:
      newState.mics = action.payload.listOfAudioInputs
      break
    case actions.MIC_STARTED:
      newState.listening = true
      newState.micLabel = action.payload.micLabel
      break
    default:
      break
  }
  return newState
}

export default userAudioReducer

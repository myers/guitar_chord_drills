import { CHORD_PLAYED } from '../actions/chord-actions'

const initialState = {
  hasPlayed: false
}

const chordReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHORD_PLAYED:
      return { hasPlayed: action.payload }
    default:
      return state
  }
}

export default chordReducer
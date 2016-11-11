import { CHORD_PLAYING } from '../actions/chord-actions'
import { TIMER_START, TIMER_CANCEL, TIMER_ENDED } from '../timers'

const initialState = {
  chordList: ["A", "E"],
  listeningForChord: {rootNote: "E"},
  score: 0,
  endDate: null
}

const chordReducer = (state = initialState, action) => {
  let newState = {}
  Object.assign(newState, state)
  switch (action.type) {
    case TIMER_START:
      newState.endDate = action.payload.endDate
      break
    case CHORD_PLAYING:
      if (action.payload.chord.rootNote == state.listeningForChord.rootNote) {
        newState.score += 1
        let canidateChords = state.chordList.reduce((acc, v) => {
          if (v != state.listeningForChord.rootNote) acc.push(v)
          return acc
        }, [])
        newState.listeningForChord = {rootNote: canidateChords[0]}
      }
      break
    default:
      break
  }
  return newState
}

export default chordReducer
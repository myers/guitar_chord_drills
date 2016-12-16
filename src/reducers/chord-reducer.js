import { CHORD_PLAYING } from '../actions/chord-actions'
import { TIMER_START, TIMER_CANCEL, TIMER_ENDED } from '../timers'

const initialState = {
  chordSets: [
    ['D', 'A'],
    ['D', 'E'],
    ['A', 'E'],
    ['Am', 'E'],
    ['Am', 'Dm'],
    ['A', 'Dm'],
    ['E', 'D'],
    ['Em', 'D']
  ],
  currentChordSetIndex: 0,
  listeningForChord: {rootNote: 'E'},
  score: 0,
  endDate: null,
  playing: false
}

const chordReducer = (state = initialState, action) => {
  let newState = {}
  Object.assign(newState, state)
  switch (action.type) {
    case TIMER_START:
      newState.endDate = action.payload.endDate
      newState.playing = true
      break
    case TIMER_ENDED:
      newState.playing = false
      break
    case CHORD_PLAYING:
      if (state.playing && action.payload.chord.rootNote == state.listeningForChord.rootNote) {
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

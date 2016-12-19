import { CHORD_PLAYING, DRILL_START, DRILL_ENDED } from '../actions/chord-actions'
import { TIMER_START } from '../timers'

// const chordSets = [
//   ['D', 'A'],
//   ['D', 'E'],
//   ['A', 'E'],
//   ['Am', 'E'],
//   ['Am', 'Dm'],
//   ['A', 'Dm'],
//   ['E', 'D'],
//   ['Em', 'D']
// ]

const initialState = {
  todaysChordSets: [
    {
      key: 'D_A',
      chords: ['D', 'A'],
      todaysScore: null,
      highScore: null
    },
    {
      key: 'D_E',
      chords: ['D', 'E'],
      todaysScore: null,
      highScore: null
    },
    {
      key: 'A_E',
      chords: ['A', 'E'],
      todaysScore: null,
      highScore: null
    }
  ],
  listeningForChord: null,
  score: 0,
  previousHighScore: 0,
  endDate: null,
  playing: false
}

const chordReducer = (state = initialState, action) => {
  let newState = {}
  Object.assign(newState, state)
  switch (action.type) {
    case DRILL_START:
      newState.chordSet = state.todaysChordSets[0]
      newState.listeningForChord = {rootNote: newState.chordSet.chords[0]}
      newState.playing = true
      break
    case TIMER_START:
      const { name, endDate } = action.payload
      if (name === 'drill') {
        newState.endDate = endDate
      }
      break
    case DRILL_ENDED:
      newState.playing = false
      break
    case CHORD_PLAYING:
      if (state.playing && action.payload.chord.rootNote === state.listeningForChord.rootNote) {
        newState.score += 1
        let canidateChords = state.chordSet.chords.reduce((acc, v) => {
          if (v !== state.listeningForChord.rootNote) acc.push(v)
          return acc
        }, [])
        newState.listeningForChord = {rootNote: canidateChords[0]}
      }
      break
    default:
      break
  }
  console.log(action, newState)
  return newState
}

export default chordReducer

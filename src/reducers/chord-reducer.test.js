import chai, { expect } from 'chai'
import { describe, it } from 'mocha'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import chordReducer from './chord-reducer.js'
import { chordPlaying } from '../actions/chord-actions.js'

describe('chordReducer', () => {
  it('should return the initial state', () => {
    expect(
      chordReducer(undefined, {})
    ).to.eql(
      {
        chordSet: ['A', 'E'],
        listeningForChord: {rootNote: 'E'},
        score: 0
      }
    )
  })

  it('should switch cords when the correct one is played', () => {
    let state = {
      chordSet: ['A', 'E'],
      listeningForChord: {rootNote: 'E'},
      score: 0
    }

    let newState = chordReducer(state, chordPlaying({rootNote: 'E'}))
    expect(newState.listeningForChord.rootNote).to.equal('A')

    newState = chordReducer(newState, chordPlaying({rootNote: 'A'}))
    expect(newState.listeningForChord.rootNote).to.equal('E')
  })
})

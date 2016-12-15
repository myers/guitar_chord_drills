import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Panel, Button } from 'react-bootstrap'

import { soundPlay } from "../user_audio/actions"

export default class ChordFaker extends React.Component {
  componentDidMount() {
    this.chords = {
      a: new Audio("/docs/A-Chord.ogg"),
      e: new Audio("/docs/E-Chord.ogg"),
      d: new Audio("/docs/D-Chord.ogg"),
      f: new Audio("/docs/F-Chord.ogg"),
      "d-slash-a": new Audio("/docs/D-slash-A-Chord.ogg"),
    }

    this.chordNodes = {}
  }

  playChord(chordName) {
    return () => {
      Object.keys(this.chords).forEach((key) => {
        this.chords[key].pause()
        this.chords[key].currentTime = 0
      })

      let audioEl = this.chords[chordName]
      this.context.store.dispatch(soundPlay(audioEl))
    }
  }

  // TODO: interate over this.chords
  render() {
    return (
      <Panel className="chord-faker" header="Chord Faker">
        <Button bsStyle="primary" onClick={this.playChord('a')}>A</Button>
        <Button bsStyle="primary" onClick={this.playChord('e')}>E</Button>
        <Button bsStyle="primary" onClick={this.playChord('d')}>D</Button>
        <Button bsStyle="primary" onClick={this.playChord('f')}>F</Button>
        <Button bsStyle="primary" onClick={this.playChord('d-slash-a')}>D/A</Button>
      </Panel>
    )
  }
}

ChordFaker.contextTypes = {
  store: React.PropTypes.object,
}


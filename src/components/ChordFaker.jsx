import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Panel, Button } from 'react-bootstrap'

export default class ChordFaker extends React.Component {
  componentDidMount() {
    this.chords = {
      a: new Audio("docs/A-Chord.ogg"),
      e: new Audio("docs/E-Chord.ogg")
    }
  }

  playChord(chordName) {
    return () => {
      console.log(this.context)
      Object.keys(this.chords).forEach((key) => {
        this.chords[key].pause()
        this.chords[key].currentTime = 0
      })
      this.chords[chordName].play()
    }
  }

  render() {
    return (
      <Panel className="chord-faker" header="Chord Faker">
        <Button bsStyle="primary" onClick={this.playChord('a')}>A</Button>
        <Button bsStyle="primary" onClick={this.playChord('e')}>E</Button>
      </Panel>
    )
  }
}


ChordFaker.contextTypes = {
  audioContext: React.PropTypes.object,
  audioDestination: React.PropTypes.object
}


import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Panel, Button } from 'react-bootstrap'

export default class ChordFaker extends React.Component {
  componentDidMount() {
    this.chords = {
      a: new Audio("docs/A-Chord.ogg"),
      e: new Audio("docs/E-Chord.ogg")
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
      audioEl.play()

      if (!this.chordNodes.hasOwnProperty(chordName)) {
        this.chordNodes[chordName] = this.context.audioContext.createMediaElementSource(audioEl)
        this.chordNodes[chordName].connect(this.context.audioDestination[0])
      }
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
  audioDestination: React.PropTypes.array
}


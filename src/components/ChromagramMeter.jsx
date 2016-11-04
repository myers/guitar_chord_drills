import React, { PropTypes } from 'react'
import { Panel } from 'react-bootstrap'

export default class ChromagramMeter extends React.Component {
  constructor(props) {
    super(props)

    this.notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

    this.rafId = null
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false
  }

  componentDidMount() {
    this.renderMeter()
  }

  componentWillUnmount() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
  }

  renderMeter() {
    this.rafId = requestAnimationFrame(() => this.renderMeter())

    for(let noteIndex = 0; noteIndex < this.notes.length; noteIndex++) {
      let height = this.context.currentChroma[noteIndex] * 2.5
      this.refs[this.notes[noteIndex]].style.height = `${100 - height}%`
    }
  }

  render() {
    return (
      <Panel header="Chromagram">
        <div className="chromagram" ref={(c) => this.visualizationDiv = c }>
          { this.notes.map((note) => {
            return (
              <div className="outer" key={note}>
                <div className="inner" ref={note}>
                  <div className="c-label">{note.endsWith("#") ? "#" : note}</div>
                </div>
              </div>
            )
          })}
        </div>
      </Panel>
    )
  }
}

ChromagramMeter.contextTypes = {
  currentChroma: React.PropTypes.object,
}



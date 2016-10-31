import React, { PropTypes } from 'react'
import { Panel } from 'react-bootstrap'

import ChromagramWorker from 'worker!../ChromagramWorker.jsx'

export default class ChromagramMeter extends React.Component {
  constructor(props) {
    super(props)

    this.notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

    this.currentChroma = new Float32Array(12)
    this.chromagramWorker = null
    this.rafId = null
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false
  }

  componentDidMount() {
    this.chromagramWorker = new ChromagramWorker()
    this.chromagramWorker.addEventListener("message", (event) => {
      this.currentChroma = event.data.currentChroma
    })
    this.context.audioContainer.addMonitor(1024, (event) => {
      this.chromagramWorker.postMessage({
        audioData: event.inputBuffer.getChannelData(0)
      })
    })
    this.renderMeter()
  }

  componentWillUnmount() {
    if (this.chromagramWorker) {
      this.chromagramWorker.terminate()
    }
    if (this.rafId) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
  }

  renderMeter() {
    this.rafId = requestAnimationFrame(() => this.renderMeter())


    for(let noteIndex = 0; noteIndex < this.notes.length; noteIndex++) {
      let height = this.currentChroma[noteIndex] * 2.5
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
  audioContainer: React.PropTypes.object,
}



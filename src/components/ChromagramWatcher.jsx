import React, { PropTypes, Children } from 'react'

import ChromagramWorker from 'worker!../ChromagramWorker'

import { chordPlaying, chordStopped } from '../actions/chord-actions'


// Watch the Chords play, and dispatch actions when we see a chord played
export default class ChromagramWatcher extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.currentChroma = new Float32Array(12)
    this.currentChroma.fill(0)
    this.chromagramWorker = null
    this.currentChord = null
    this.chordPlayingSince = null
    this.dispatchedAction = false
  }

  actOnChord(eventData) {
    if (eventData.hasOwnProperty("chord")) {
      if (JSON.stringify(this.currentChord) !== JSON.stringify(eventData.chord)) {
        this.currentChord = eventData.chord
        this.chordPlayingSince = eventData.playbackTime
        this.dispatchedAction = false
      } else {
        if (this.chordPlayingSince + 0.1 <= eventData.playbackTime) {
          this.context.store.dispatch(chordPlaying(this.currentChord))
          this.dispatchedAction = true
        }
      }
    } else {
      this.currentChord = null
      this.chordPlayingSince = null
      this.dispatchedAction = false
    }
  }

  componentDidMount() {
    this.chromagramWorker = new ChromagramWorker()
    this.chromagramWorker.addEventListener("message", (event) => {
      this.currentChroma.set(event.data.currentChroma)
      this.actOnChord(event.data)
    })
    this.context.audioContainer.addMonitor(1024, (event) => {
      this.chromagramWorker.postMessage({
        playbackTime: event.playbackTime,
        audioData: event.inputBuffer.getChannelData(0),
      })
    })
  }

  getChildContext() {
    return {
      currentChroma: this.currentChroma
    }
  }

  componentWillUnmount() {
    if (this.chromagramWorker) {
      this.chromagramWorker.terminate()
    }
  }

  render() {
    return Children.only(this.props.children)
  }
}

ChromagramWatcher.childContextTypes = {
  currentChroma: React.PropTypes.object
}

ChromagramWatcher.contextTypes = {
  audioContainer: React.PropTypes.object,
}



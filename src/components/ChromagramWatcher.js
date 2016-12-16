import React, { Children } from 'react'
import _ from 'lodash'
import bufferSize from '../ChromagramConstants.js'
import ChromagramWorker from 'worker-loader?inline!../ChromagramWorker'

import { chordPlaying, chordStopped } from '../actions/chord-actions'
import { monitorAdd } from '../user_audio/actions.js'
const CHORD_TIME_THRESHOLD = 0.1

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
    if (!_.isEqual(this.currentChord, eventData.chord)) {
      if (this.dispatchedAction) {
        this.context.store.dispatch(chordStopped(this.currentChord))
        this.dispatchedAction = false
      }
      if (eventData.chord === undefined) {
        this.currentChord = null
        this.chordPlayingSince = null
      } else {
        this.currentChord = eventData.chord
        this.chordPlayingSince = eventData.playbackTime
      }
    } else {
      if (this.chordPlayingSince + CHORD_TIME_THRESHOLD <= eventData.playbackTime && !this.dispatchedAction) {
        console.log("dispatch", this.currentChord)
        this.context.store.dispatch(chordPlaying(this.currentChord))
        this.dispatchedAction = true
      }
    }
  }

  componentDidMount() {
    this.chromagramWorker = new ChromagramWorker()
    this.chromagramWorker.addEventListener("message", (event) => {
      this.currentChroma.set(event.data.currentChroma)
      this.actOnChord(event.data)
    })
    this.context.store.dispatch(monitorAdd(bufferSize, (event) => {
      this.chromagramWorker.postMessage({
        playbackTime: event.playbackTime,
        audioData: event.inputBuffer.getChannelData(0),
      })
    }))
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
  store: React.PropTypes.object,
}

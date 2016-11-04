import React, { PropTypes } from 'react'

import ChromagramWorker from 'worker!../ChromagramWorker.jsx'

// Watch the Chords play, and dispatch actions when we see a chord played
// need to judge what volumn level is being played at

export default class ChromagramWatcher extends React.Component {
  constructor(props) {
    super(props)

    this.currentChroma = new Float32Array(12)
    this.currentChroma.fill(0)
    this.chromagramWorker = null
  }

  componentDidMount() {
    this.chromagramWorker = new ChromagramWorker()
    this.chromagramWorker.addEventListener("message", (event) => {
      this.currentChroma.set(event.data.currentChroma)
    })
    this.context.audioContainer.addMonitor(1024, (event) => {
      this.chromagramWorker.postMessage({
        audioData: event.inputBuffer.getChannelData(0)
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
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

ChromagramWatcher.childContextTypes = {
  currentChroma: React.PropTypes.object
}

ChromagramWatcher.contextTypes = {
  audioContainer: React.PropTypes.object,
}



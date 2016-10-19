import React, { PropTypes } from 'react'

export default class AudioContainer extends React.Component {
  getChildContext() {
    return {
      audioContext: this.audioContext,
      audioSource: this.audioSource
    }
  }

  componentDidMount() {
    this.audioContext = new AudioContext()
    this.audioSource = null

    // navigator.mediaDevices.getUserMedia({audio: true, video: false})
    //   .then((mediaStream) => {
    //     this.audioSource = this.audioContext.createMediaStreamSource(stream)
    //     console.log("have audio stream")
    //   })
    //   .catch(function(error) { console.error(error) })
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )

  }
}

AudioContainer.childContextTypes = {
  audioContext: React.PropTypes.object,
  audioSource: React.PropTypes.object
}

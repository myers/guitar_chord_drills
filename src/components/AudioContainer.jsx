import React, { PropTypes } from 'react'

export default class AudioContainer extends React.Component {
  constructor(props) {
    super(props)
    let audioContext = new AudioContext()
    this.state = {
      audioContext,
      audioDestination: [audioContext.destination]
    }
  }

  getChildContext() {
    return {
      audioContext: this.state.audioContext,
      audioDestination: this.state.audioDestination
    }
  }

  componentDidMount() {

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
  audioDestination: React.PropTypes.array
}

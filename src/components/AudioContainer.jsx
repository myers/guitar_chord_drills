import React, { PropTypes } from 'react'

import VolumeMeterNode from './VolumeMeterNode.jsx'

export default class AudioContainer extends React.Component {
  constructor(props) {
    super(props)

    this.monitorNodes = []
    this.sourceElements = {}
    this.audioContext = new AudioContext()

    this.currentSource = null
  }

  addMonitor(samples, func) {
    let node = this.audioContext.createScriptProcessor(samples)
    node.onaudioprocess = func

    node.connect(this.audioContext.destination)
    this.monitorNodes.push(node)
  }

  addSourceElement(el) {
    let src = el.getAttribute('src')
    if (!this.sourceElements.hasOwnProperty(src)) {
      this.sourceElements[src] = this.audioContext.createMediaElementSource(el)
      el.addEventListener('play', (event) => this.onPlay(this.sourceElements[src]))
    }
  }

  onPlay(sourceNode) {
    if (this.currentSource) {
      this.currentSource.disconnect()
    }
    this.currentSource = sourceNode
    for (let node of this.monitorNodes) {
      sourceNode.connect(node)
    }
    sourceNode.connect(this.audioContext.destination)
  }

  getChildContext() {
    return {
      audioContainer: this
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
  audioContainer: React.PropTypes.object
}

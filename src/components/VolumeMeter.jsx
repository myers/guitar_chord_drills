import React, { PropTypes } from 'react'

import { Panel } from 'react-bootstrap'

// code from https://github.com/cwilso/volume-meter/blob/master/volume-meter.js
export default class VolumeMeter extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.processor = this.createVolumeProcessor()
  }

  createVolumeProcessor(clipLevel, averaging, clipLag) {
    let processor = this.context.audioContext.createScriptProcessor(512)
    processor.onaudioprocess = (event) => this.volumeAudioProcess(event)
    processor.clipping = false
    processor.lastClip = 0
    processor.volume = 0
    processor.clipLevel = clipLevel || 0.98
    processor.averaging = averaging || 0.95
    processor.clipLag = clipLag || 750

    processor.connect(this.context.audioDestination[0])
    this.context.audioDestination[0] = processor

    processor.checkClipping = function() {
      console.log("checkClipping")
      if (!this.clipping)
        return false
      if ((this.lastClip + this.clipLag) < window.performance.now())
        this.clipping = false
      return this.clipping
    }

    processor.shutdown = function() {
      console.log("shutdown")
      this.disconnect()
      this.onaudioprocess = null
    }

    return processor
  }

  volumeAudioProcess(event) {

    let inputBuffer = event.inputBuffer;
    let outputBuffer = event.outputBuffer;
    // Loop through the output channels (in this case there is only one)
    for (let channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
      outputBuffer.copyToChannel(inputBuffer.getChannelData(channel), channel)
    }

    let buf = inputBuffer.getChannelData(0)
    let bufLength = buf.length
    let sum = 0
    let x

    // Do a root-mean-square on the samples: sum up the squares...
    for (let ii = 0; ii < bufLength; ii++) {
      x = buf[ii]
      if (Math.abs(x) >= this.clipLevel) {
        this.clipping = true
        this.lastClip = window.performance.now()
      }
      sum += x * x
    }

    // ... then take the square root of the sum.
    let rms =  Math.sqrt(sum / bufLength)

    // Now smooth this out with the averaging factor applied
    // to the previous sample - take the max here because we
    // want "fast attack, slow release."
    this.volume = Math.max(rms, this.volume * this.averaging)
    console.log("volumeAudioProcess", this.volume)

  }

  render() {
    return (
      <Panel header="Volume">
        <div ref={(c) => { this.visualizationDiv = c }}/>
      </Panel>
    )
  }
}

VolumeMeter.contextTypes = {
  audioContext: React.PropTypes.object,
  audioDestination: React.PropTypes.array
}


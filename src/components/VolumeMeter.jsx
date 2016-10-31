import React, { PropTypes } from 'react'

import { Panel } from 'react-bootstrap'


import VolumeMeterNode from './VolumeMeterNode.jsx'

// code from https://github.com/cwilso/volume-meter/blob/master/volume-meter.js
export default class VolumeMeter extends React.Component {
  constructor(props) {
    super(props)
    this.rafId = null
  }

  componentDidMount() {
    this.volumeMeterNode = new VolumeMeterNode()
    this.context.audioContainer.addMonitor(512, (event) => this.volumeMeterNode.onAudioProcess(event))

    this.renderMeter()
  }

  componentWillUnmount() {
    if(this.rafId) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
  }

  renderMeter() {
    this.rafId = requestAnimationFrame(() => this.renderMeter())

    let size = (this.volumeMeterNode.volume * 500 * 1.4) / 5
    this.visualizationDiv.style.height = `${100 - size}%`
  }

  render() {
    return (
      <Panel header="Volume">
        <div className="volume-meter">
          <div className="outer">
            <div className="inner" ref={(c) => { this.visualizationDiv = c }}/>
          </div>
        </div>
      </Panel>
    )
  }
}

VolumeMeter.contextTypes = {
  audioContainer: React.PropTypes.object,
}

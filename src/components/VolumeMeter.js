import React, { PropTypes } from 'react'

import { Panel } from 'react-bootstrap'

import VolumeMeterNode from './VolumeMeterNode'

// code from https://github.com/cwilso/volume-meter/blob/master/volume-meter.js
export default class VolumeMeter extends React.Component {
  constructor (props) {
    super(props)
    this.rafId = null
    this.monitor = (event) => this.volumeMeterNode.onAudioProcess(event)
  }

  componentDidMount () {
    this.volumeMeterNode = new VolumeMeterNode()
    this.context.userAudio.addMonitor(512, this.monitor)

    this.renderMeter()
  }

  componentWillUnmount () {
    this.context.userAudio.removeMonitor(this.monitor)

    if (this.rafId) {
      window.cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
  }

  renderMeter () {
    this.rafId = window.requestAnimationFrame(() => this.renderMeter())

    let size = (this.volumeMeterNode.volume * 500 * 1.4) / 5
    this.visualizationDiv.style.height = `${100 - size}%`
  }

  render () {
    return (
      <Panel header='Volume'>
        <div className='volume-meter'>
          <div className='outer'>
            <div className='inner' ref={(c) => { this.visualizationDiv = c }} />
          </div>
        </div>
      </Panel>
    )
  }
}

VolumeMeter.contextTypes = {
  userAudio: PropTypes.object
}

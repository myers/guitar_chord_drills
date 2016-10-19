import React, { PropTypes } from 'react'

import { Panel } from 'react-bootstrap'

export default class VolumeMeter extends React.Component {
  constructor(props) {
    super(props)
  }

  draw(width, height, canvasCtx, prevVolume, volume, maxVolume) {
    const vol = Math.max(volume, prevVolume * 0.95)
    canvasCtx.clearRect(0, 0, width, height)
    for (let i = 0; i < 5; i++) {
      if (i === 4 && maxVolume < vol) {
        canvasCtx.fillStyle = 'red'
      } else if ((i + 1) * (maxVolume / 5) < vol) {
        canvasCtx.fillStyle = 'green'
      } else {
        canvasCtx.fillStyle = 'grey'
      }
      const x = width * i / 5
      const y = height * 0.6 - height * i * 0.15
      canvasCtx.fillRect(x, y, width / 6, height - y)
      if (vol < maxVolume && i * 10 < vol) {
        canvasCtx.fillStyle = 'green'
        canvasCtx.fillRect(x, y, ((vol % (maxVolume / 5)) / (maxVolume / 5)) * (width / 6), height - y)
      }
    }
  }



  render() {
    return (
      <Panel header="Volume">
        {"Doesn't work yet"}
      </Panel>
    )
  }
}

VolumeMeter.propTypes = {
}


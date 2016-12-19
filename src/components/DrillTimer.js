import React, { Component, PropTypes } from 'react'

import { Panel } from 'react-bootstrap'

export default class DrillTimer extends Component {
  constructor (props, context) {
    super(props, context)
    this.rafId = null
    this.outputSpan = null
  }

  shouldComponentUpdate (nextProps, nextState) {
    return false
  }

  componentDidMount () {
    this.renderTimer()
  }

  componentWillUnmount () {
    if (this.rafId) {
      window.cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
  }

  renderTimer () {
    this.rafId = window.requestAnimationFrame(() => this.renderTimer())

    const { endDate } = this.props
    const secondsLeft = Math.ceil((endDate - Date.now()) / 1000)
    if (secondsLeft >= 0) {
      this.outputSpan.textContent = secondsLeft
    } else {
      this.outputSpan.textContent = 0
    }
  }

  render () {
    return (
      <Panel className='timer' header='Time Left'>
        <span ref={(c) => { this.outputSpan = c }} />
      </Panel>
    )
  }
}

DrillTimer.propTypes = {
  endDate: PropTypes.number.isRequired
}

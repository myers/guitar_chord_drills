import React, { PropTypes } from 'react'

import { Panel } from 'react-bootstrap'
import { timerStart } from '../timers'

export default class DrillTimer extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.rafId = null
    this.outputSpan = null
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false
  }

  componentDidMount() {
    // TODO move this somewhere else
    this.context.store.dispatch(timerStart('drill', 5))

    this.renderTimer()
  }

  componentWillUnmount() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
  }

  renderTimer() {
    this.rafId = requestAnimationFrame(() => this.renderTimer())

    const { endDate } = this.context.store.getState().chordDrill
    const secondsLeft = Math.ceil((endDate - Date.now()) / 1000)
    if (secondsLeft >= 0) {
      this.outputSpan.textContent = secondsLeft
    } else {
      this.outputSpan.textContent = 0
    }
  }

  render() {
    return (
      <Panel className="timer" header="Time Left">
        <span ref={(c) => this.outputSpan = c } />
      </Panel>
    )
  }
}

DrillTimer.contextTypes = {
  store: React.PropTypes.object,
}


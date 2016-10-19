import React, { PropTypes } from 'react'

import { Panel } from 'react-bootstrap'

export default class DrillTimer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Panel className="timer" header="Time Left">
        {this.props.timeLeft}
      </Panel>
    )
  }
}

DrillTimer.propTypes = {
}


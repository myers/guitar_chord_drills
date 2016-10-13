import React, { PropTypes } from 'react'

import { Panel } from 'react-bootstrap'

export default class Scoreboard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Panel className="scoreboard" header="Score">
        <span className="score">{this.props.score}</span>
      </Panel>
    )
  }
}

Scoreboard.propTypes = {
}


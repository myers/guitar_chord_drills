import React, { PropTypes } from 'react'

import { Panel } from 'react-bootstrap'

export default class ScorePanel extends React.Component {
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

ScorePanel.propTypes = {
  score: PropTypes.number,
}


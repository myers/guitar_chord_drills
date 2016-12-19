import React, { PropTypes } from 'react'

import { Panel } from 'react-bootstrap'

const ScorePanel = (props) => {
  return (
    <Panel className='scoreboard' header='Score'>
      <span className='score'>{props.score}</span>
    </Panel>
  )
}

ScorePanel.propTypes = {
  score: PropTypes.number
}

export default ScorePanel

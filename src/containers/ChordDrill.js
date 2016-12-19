import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

import ChordPane from '../components/ChordPane'
import ScorePanel from '../components/ScorePanel'
import VolumeMeter from '../components/VolumeMeter'
import ChromagramMeter from '../components/ChromagramMeter'
import DrillTimer from '../components/DrillTimer'
import ChordFaker from '../components/ChordFaker'
import { timerStart } from '../timers'
import { drillStart, drillEnded } from '../actions/chord-actions'

class _ChordDrill extends Component {
  componentDidMount () {
    this.props.onMount()
  }

  render () {
    if (!this.props.playing) {
      return (
        <Row>
          {' not playing '}
        </Row>
      )
    }

    return (
      <Row>
        <Col md={2}>
          <Row>
            <Col>
              <ChordFaker />
              <ChromagramMeter />
              <VolumeMeter />
            </Col>
          </Row>
        </Col>
        <Col md={8}>
          <ChordPane chord={this.props.currentChord} />
        </Col>
        <Col md={2}>
          <Row>
            <Col>
              <DrillTimer endDate={this.props.endDate} />
              <ScorePanel score={this.props.score} />
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}
_ChordDrill.propTypes = {
  onMount: PropTypes.func.isRequired,
  currentChord: PropTypes.string,
  endDate: PropTypes.number
}

const mapStateToProps = state => ({
  playing: state.chordDrill.playing,
  endDate: state.chordDrill.endDate,
  currentChord: state.chordDrill.playing ? state.chordDrill.listeningForChord.rootNote : null,
  score: state.chordDrill.score
})
const mapDispatchToProps = dispatch => ({
  onMount: () => {
    console.log('here')
    dispatch(drillStart())
    dispatch(timerStart('drill', drillEnded(), 60))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(_ChordDrill)

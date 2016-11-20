import React from 'react'

import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Grid, Row, Col } from 'react-bootstrap'

import ChordPaneContainer from '../containers/ChordPaneContainer.jsx'
import ScorePanelContainer from '../containers/ScorePanelContainer.jsx'
import VolumeMeter from '../components/VolumeMeter.jsx'
import ChromagramMeter from '../components/ChromagramMeter.jsx'
import DrillTimer from '../components/DrillTimer.jsx'
import ChordFaker from '../components/ChordFaker.jsx'

export default (props) => {
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
        <ChordPaneContainer />
      </Col>
      <Col md={2}>
        <Row>
          <Col>
            <DrillTimer timeLeft={'0:00'} />
            <ScorePanelContainer />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
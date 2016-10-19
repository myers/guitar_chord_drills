import React from 'react'
import {render} from 'react-dom'
import ChordPane from './components/ChordPane.jsx'
import Scoreboard from './components/Scoreboard.jsx'
import VolumeMeter from './components/VolumeMeter.jsx'
import ChromagramMeter from './components/ChromagramMeter.jsx'
import DrillTimer from './components/DrillTimer.jsx'
import AudioContainer from './components/AudioContainer.jsx'
import ChordFaker from './components/ChordFaker.jsx'

require('./css/style.css')

import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Grid, Row, Col } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentChord: "A"
    }
  }

  render () {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Guitar Chord Drills</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="#">Link</NavItem>
            <NavItem eventKey={2} href="#">Link</NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>

        <AudioContainer>
          <Grid>
            <Row>
              <Col md={2}>
                <Row>
                  <Col>
                    <VolumeMeter />
                    <ChromagramMeter />
                    <ChordFaker />
                  </Col>
                </Row>
              </Col>
              <Col md={8}>
                <ChordPane chord={this.state.currentChord} />
              </Col>
              <Col md={2}>
                <Row>
                  <Col>
                    <DrillTimer timeLeft={'0:00'} />
                    <Scoreboard score={3} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Grid>
        </AudioContainer>
      </div>
    )
  }
}
render(<App/>, document.getElementById('root'))

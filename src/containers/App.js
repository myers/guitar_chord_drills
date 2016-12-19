import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem, Grid } from 'react-bootstrap'

import ChromagramWatcher from '../components/ChromagramWatcher'

export default (props) => (
  <div>
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href='#'>🎸 Chord Drills</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <LinkContainer onlyActiveOnIndex to={{ pathname: '/' }}>
          <NavItem eventKey={1}>Splash</NavItem>
        </LinkContainer>
        <LinkContainer to={{ pathname: '/mic-setup' }}>
          <NavItem eventKey={2}>Mic setup</NavItem>
        </LinkContainer>
        <LinkContainer to={{ pathname: '/todays-chords' }}>
          <NavItem eventKey={2}>{"Today's Chords"}</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar>

    <ChromagramWatcher>
      <Grid>
        {props.children}
      </Grid>
    </ChromagramWatcher>
  </div>
)

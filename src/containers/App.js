import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Grid, Row, Col } from 'react-bootstrap'

import ChromagramWatcher from '../components/ChromagramWatcher'

export default (props) => (
  <div>
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#">🎸 Chord Drills</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <LinkContainer onlyActiveOnIndex={true} to={{ pathname: '/' }}>
          <NavItem eventKey={1}>Splash</NavItem>
        </LinkContainer>
        <LinkContainer to={{ pathname: '/mic-setup' }}>
          <NavItem eventKey={2}>Mic setup</NavItem>
        </LinkContainer>
        <NavDropdown eventKey={3} title='Dropdown' id='basic-nav-dropdown'>
          <MenuItem eventKey={3.1}>Action</MenuItem>
          <MenuItem eventKey={3.2}>Another action</MenuItem>
          <MenuItem eventKey={3.3}>Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.3}>Separated link</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar>

    <ChromagramWatcher>
      <Grid>
        {props.children}
      </Grid>
    </ChromagramWatcher>
  </div>
)

import React from 'react'

import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Grid, Row, Col } from 'react-bootstrap'

export default class ChordDrill extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <form>
          <label>
            Name:
              <input type="text" defaultValue={"foo"} />
          </label>
            <input type="submit" value="Submit" />
          </form>
        </Row>
      </Grid>
    )
  }
}
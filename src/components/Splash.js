import React from 'react'
import { Grid, Row, Panel, Button, Jumbotron } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default function(props) {
  return (
    <Grid>
      <Row>
        <Jumbotron>
          <h1>🎸 Ready to get better every day on chord changes?</h1>
          <p>
            <LinkContainer to={{ pathname: '/mic-setup' }}>
              <Button bsStyle="primary">Learn more</Button>
            </LinkContainer>
          </p>
        </Jumbotron>
      </Row>
    </Grid>
  )
}

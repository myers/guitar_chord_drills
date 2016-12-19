import React from 'react'

import { Row, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { connect } from 'react-redux'

const _TodaysChords = (props) => {
  const chords = props.chordSets.map((chordSet) => {
    const key = `${chordSet.chords[0]}-${chordSet.chords[1]}`
    return (
      <li key={key}>{chordSet.chords[0]} - {chordSet.chords[1]} - your score {chordSet.score}</li>
    )
  })
  return (
    <Row>
      <h1>{ "Today's Chords" }</h1>
      <ul>
        { chords }
      </ul>
      <LinkContainer to={{ pathname: '/chord-drill' }}>
        <Button bsStyle='primary'>{"Let's Rock"}</Button>
      </LinkContainer>
    </Row>
  )
}

const mapStateToProps = state => ({
  chordSets: state.chordDrill.todaysChordSets
})

export default connect(mapStateToProps)(_TodaysChords)

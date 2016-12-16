import React from 'react'

import { Row } from 'react-bootstrap'

export default (props) => {
  chords = props.chordSets.map((chordSet) => {
    const key = `${chordSet.chords[0]}-${chordSet.chords[1]}`
    return (
      <li key={key}>{chordSet.chords[0]}
    )
  })
  return (
    <Row>
      <h1>{ "Today's Chords" }</h1>
      <ul>
        { chords }
      </ul>
    </Row>
  )
}

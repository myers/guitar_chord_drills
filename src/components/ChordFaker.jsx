import React, { PropTypes } from 'react'

import { Panel } from 'react-bootstrap'

export default ChordFaker = () =>
  return (
    <Panel className="chord-faker" header="Chord Faker">
      <audio id="chord-a" src="docs/A-Chord.ogg" />
      <audio id="chord-e" src="docs/E-Chord.ogg" />
    </Panel>
  )
}

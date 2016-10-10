import React, { PropTypes } from 'react'

export default class ChordPane extends React.Component {
  constructor(props) {
    super(props)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  componentDidMount() {
    this.paper = new Raphael(document.getElementById("chord-pane"))

    const chord = new ChordBox(this.paper, 0, 0, 200, 200);
    const chord_struct = {"name":"D Major","chord":[[1,2],[2,3],[3,2],[4,0],[5,"x"],[6,"x"]],"position":0,"bars":[]};
    chord.setChord(
      chord_struct.chord,
      chord_struct.position,
      chord_struct.bars,
      chord_struct.position_text
    )
    chord.draw()
  }

  render() {
    return (
      <div id="chord-pane"></div>
    )
  }
}

ChordPane.propTypes = {
  chord: PropTypes.string
}


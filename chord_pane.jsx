import React, { PropTypes } from 'react'

export default class ChordPane extends React.Component {
  constructor(props) {
    super(props)
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.renderChord(nextProps.chord)
    return false
  }

  renderChord(chord) {
    jtab.render($('#chord-pane'), chord);
    // add missing viewbox that will allow us to scale this up
    var svg = $('#chord-pane svg').get(0)
    svg.setAttribute('viewBox', '0 0 138 118')
    svg.setAttribute('height', '100%')
    svg.removeAttribute('style')
    svg.removeAttribute('width')
    $('#chord-pane div').css('height', '500px')
  }

  componentDidMount() {
    this.renderChord(this.props.chord)
  }

  render() {
    var style = {"paddingBottom": "67%"}
    return (
      <div id="chord-pane" className="chord-container" style={style}></div>
    )
  }
}

ChordPane.propTypes = {
  chord: PropTypes.string
}


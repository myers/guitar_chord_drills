import React, { PropTypes } from 'react'
import { Panel } from 'react-bootstrap'

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
    svg.setAttribute('width', '100%')
    svg.removeAttribute('style')
    svg.removeAttribute('height')
    $('#chord-pane div').css('height', '75vh')
  }

  componentDidMount() {
    this.renderChord(this.props.chord)
  }

  render() {
    return (
      <Panel>
        <div id="chord-pane" className="chord-container"></div>
      </Panel>
    )
  }
}

ChordPane.propTypes = {
  chord: PropTypes.string
}


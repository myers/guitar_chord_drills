/* eslint-env jquery */
/* global jtab */

import React, { PropTypes, Component } from 'react'

// Following this pattern https://facebook.github.io/react/tips/use-react-with-other-libraries.html
export default class ChordPane extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    this.renderChord(nextProps.chord)
    return false
  }

  componentDidMount () {
    this.renderChord(this.props.chord)
  }

  renderChord (chord) {
    jtab.render($('#chord-pane'), chord)
    // add missing viewbox that will allow us to scale this up
    var svg = $('#chord-pane svg').get(0)
    svg.setAttribute('viewBox', '0 0 138 118')
    svg.setAttribute('width', '100%')
    svg.removeAttribute('style')
    svg.removeAttribute('height')
    $('#chord-pane div').css('padding-right', '50px')
    // $('#chord-pane div').css('height', '100%')
  }

  render () {
    return (
      <div id='chord-pane' className='chord-container' />
    )
  }
}

ChordPane.propTypes = {
  chord: PropTypes.string.isRequired
}

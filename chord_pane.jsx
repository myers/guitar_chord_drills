import React, { PropTypes } from 'react'

export default class ChordPane extends React.Component {
  constructor(props) {
    super(props)
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate", nextProps, nextState)
    return false
  }

  componentDidMount() {
    jtab.render($('#chord-pane'), this.props.chord);
    // work around missing viewbox that would allow us to scale this up
    var svg = $('#chord-pane svg').get(0)
    svg.setAttribute('viewBox', '0 0 138 118')
    svg.setAttribute('height', '100%')
    svg.removeAttribute('style')
    svg.removeAttribute('width')
    $('#chord-pane div').css('height', '500px')
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


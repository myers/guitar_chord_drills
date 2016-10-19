import React, { PropTypes } from 'react'
import { Panel } from 'react-bootstrap'

export default class ChromagramMeter extends React.Component {
  constructor(props) {
    super(props)

    this.notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false
  }

  componentDidMount() {
    this.renderMeter()
  }

  renderMeter() {
    //requestAnimationFrame(() => renderMeter())
    console.log(this.visualizationDiv)
    // for (let i = 0; i < this.props.currentChroma.length; i++) {
    //   const value = currentChroma[i]
    // }
    //   visualizationCtx.fillStyle = gradient;
    //   // the max value we've seen in a chroma is >50
    //   visualizationCtx.fillRect(i * 40, 250, 39, value * -5);

    //   visualizationCtx.fillStyle = 'black';
    //   visualizationCtx.fillText(notes[i], (i * 40)+3, 250);
  }

  render() {
    return (
      <Panel header="Chromagram">
        <div className="chromagram" ref={(c) => { this.visualizationDiv = c; }}>
          { this.notes.map((note) => {
            return <div className={ `note-${note.toLowerCase().replace('#', '-sharp')}`}><span>{note}</span></div>
          })}
        </div>
      </Panel>
    )
  }
}

ChromagramMeter.propTypes = {
  currentChroma: PropTypes.object
}


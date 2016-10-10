import React from 'react';
import {render} from 'react-dom';
import ChordPane from './chord_pane.jsx'
require('./style.css')

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentChord: "D"
    }
  }

  render () {
    return (
      <div>
        <p>Hello React!</p>
        <ChordPane chord={this.state.currentChord} />
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'))

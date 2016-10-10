import React from 'react';
import {render} from 'react-dom';
import ChordPane from './chord_pane.jsx'

class App extends React.Component {
  render () {
    return (
      <div>
        <p>Hello React!</p>
        <ChordPane chord="C" />
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'))

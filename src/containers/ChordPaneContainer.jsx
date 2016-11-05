import { connect } from 'react-redux';
import ChordPane from '../components/ChordPane.jsx';

const mapStateToProps = state => {
  console.log("state in mapStateToProps", state)
  return {
    chord: state.chordDrill.listeningForChord.rootNote
  }
}

export default connect(mapStateToProps)(ChordPane)
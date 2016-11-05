import { connect } from 'react-redux';
import ChordPane from '../components/ChordPane.jsx';

const mapStateToProps = state => ({
  chord: state.chordDrill.listeningForChord.rootNote
})

export default connect(mapStateToProps)(ChordPane)
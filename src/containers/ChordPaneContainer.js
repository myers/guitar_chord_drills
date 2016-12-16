import { connect } from 'react-redux'
import ChordPane from '../components/ChordPane'

const mapStateToProps = state => ({
  chord: state.chordDrill.listeningForChord.rootNote
})

export default connect(mapStateToProps)(ChordPane)

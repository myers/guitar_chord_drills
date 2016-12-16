import { connect } from 'react-redux'
import ScorePanel from '../components/ScorePanel'

const mapStateToProps = state => ({
  score: state.chordDrill.score
})

export default connect(mapStateToProps)(ScorePanel)

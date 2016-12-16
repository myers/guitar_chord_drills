import { PropTypes, Component, Children } from 'react'

export const userAudioShape = PropTypes.shape({
  addMonitor: PropTypes.func.isRequired,
  removeMonitor: PropTypes.func.isRequired
})

export default class UserAudioProvider extends Component {
  getChildContext () {
    return { userAudio: this.userAudio }
  }

  constructor (props, context) {
    super(props, context)
    this.userAudio = props.userAudio
  }

  render () {
    return Children.only(this.props.children)
  }
}
UserAudioProvider.propTypes = {
  userAudio: userAudioShape.isRequired,
  children: PropTypes.element.isRequired
}
UserAudioProvider.childContextTypes = {
  userAudio: userAudioShape.isRequired
}

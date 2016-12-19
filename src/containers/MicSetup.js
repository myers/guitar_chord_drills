import React from 'react'
import { connect } from 'react-redux'
import { micRequest } from '../user_audio/actions'
import { Grid, Row, Button, Radio } from 'react-bootstrap'
import ChromagramMeter from '../components/ChromagramMeter'
import VolumeMeter from '../components/VolumeMeter'

const _MicSetup = (props) => {
  if (!props.listening) {
    return (
      <Grid>
        <Row>
          <Button onClick={props.onListen} bsStyle='primary' bsSize='large'>Listen!</Button>
        </Row>
      </Grid>
    )
  }

  const mics = props.mics.map((mic) => {
    return (
      <Radio
        name={'selectedMic'}
        onClick={() => { props.onMicSelected(mic.deviceId) }}
        key={mic.deviceId}
        defaultChecked={mic.label === props.micLabel}>
        {mic.label}
      </Radio>
    )
  })

  return (
    <Grid>
      <Row>
        <span>Avaliable Mics</span>
        {mics}
        <ChromagramMeter />
        <VolumeMeter />

      </Row>
    </Grid>
  )
}

const mapStateToProps = state => ({
  listening: state.userAudio.listening,
  mics: state.userAudio.mics,
  micLabel: state.userAudio.micLabel
})
const mapDispatchToProps = dispatch => ({
  onListen: () => { dispatch(micRequest()) },
  onMicSelected: (deviceId) => { dispatch(micRequest(deviceId)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(_MicSetup)

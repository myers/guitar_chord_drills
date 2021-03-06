export const SOUND_PLAY = 'SOUND_PLAY'

export const soundPlay = (mediaEl) => ({
  type: SOUND_PLAY,
  payload: {mediaEl}
})

export const MIC_REQUEST = 'MIC_REQUEST'

export const micRequest = (deviceId) => ({
  type: MIC_REQUEST,
  payload: { deviceId }
})

export const MIC_REQUEST_ERROR = 'MIC_REQUEST_ERROR'

export const micRequestError = (error) => ({
  type: MIC_REQUEST_ERROR,
  payload: {error}
})

export const MIC_REQUESTED = 'MIC_REQUESTED'

export const micRequested = () => ({
  type: MIC_REQUESTED
})

export const MIC_STARTED = 'MIC_STARTED'

export const micStarted = (micLabel) => ({
  type: MIC_STARTED,
  payload: {micLabel}
})

export const MIC_ENUMERATION_REQUEST = 'MIC_ENUMERATION_REQUEST'

export const micEnumerationRequest = () => ({
  type: MIC_ENUMERATION_REQUEST
})

export const MIC_ENUMERATION_RESULT = 'MIC_ENUMERATION_RESULT'

export const micEnumerationResult = (listOfAudioInputs) => ({
  type: MIC_ENUMERATION_RESULT,
  payload: {listOfAudioInputs}
})

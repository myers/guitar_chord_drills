export const CHORD_PLAYING = 'CHORD_PLAYING'

export const chordPlaying = (chord) => ({
  type: CHORD_PLAYING,
  payload: {chord: chord}
})

export const CHORD_STOPPED = 'CHORD_STOPPED'

export const chordStopped = (chord) => ({
  type: CHORD_STOPPED,
  payload: {chord: chord}
})

export const DRILL_START = 'DRILL_START'

export const drillStart = () => ({
  type: DRILL_START
})

import {Chromagram, ChordDetector} from 'chord_detector'

const chromagram = new Chromagram(1024, 44100)
const chordDetector = new ChordDetector()

// only sound above this volume will be analyised for chords
const VOLUME_THRESHOLD = 0.1

function volumeLevel(audioData) {
  const len = audioData.length
  let total = 0
  let i = 0
  let rms = 0
  while (i < len) total += Math.abs(audioData[i++])
  return Math.sqrt(total / len)
}

onmessage = function(event) {
  if (!event.data.hasOwnProperty('audioData')) {
    console.error("expected audioData, got", event.data)
  }
  chromagram.processAudioFrame(event.data.audioData)

  if (!chromagram.isReady()) return

  const currentChroma = chromagram.getChromagram()

  let message = {
    currentChroma: currentChroma,
    playbackTime: event.data.playbackTime,
  }

  if (volumeLevel(event.data.audioData) > VOLUME_THRESHOLD) {
    chordDetector.detectChord(currentChroma)
    Object.assign(message, {
      chord: {
        rootNote: chordDetector.rootNote(),
        quality: chordDetector.quality(),
        intervals: chordDetector.intervals(),
      },
    })
  }

  postMessage(message)
}

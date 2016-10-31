import {Chromagram, ChordDetector} from 'chord_detector'

const chromagram = new Chromagram(1024, 44100)
const chordDetector = new ChordDetector()

let firstSampleArrivedAt = null

onmessage = function(event) {
  if (!event.data.hasOwnProperty('audioData')) {
    console.log("expected audioData, got", event.data)
  }
  chromagram.processAudioFrame(event.data.audioData)

  if (firstSampleArrivedAt == null) {
    firstSampleArrivedAt = event.data.sentAt
  }

  if (!chromagram.isReady()) return

  let currentChroma = chromagram.getChromagram()
  chordDetector.detectChord(currentChroma)
  postMessage({
    receivedAt: firstSampleArrivedAt,
    currentChroma: currentChroma,
    rootNote: chordDetector.rootNote(),
    quality: chordDetector.quality(),
    intervals: chordDetector.intervals()
  })
  firstSampleArrivedAt = null
}

/* eslint-env worker */

import { Chromagram, ChordDetector } from 'chord_detector'
import bufferSize from './ChromagramConstants.js'

const chromagram = new Chromagram(bufferSize, 44100)
const chordDetector = new ChordDetector()

// only sound above this volume will be analyised for chords
const VOLUME_THRESHOLD = -10

function volumeLevel (audioData) {
  const len = audioData.length
  let total = 0
  let i = 0
  while (i < len) total += Math.abs(audioData[i++])
  let rms = Math.sqrt(total / (len / 2))
  let decibel = 20 * (Math.log(rms) / Math.log(10))
  return decibel
}

self.onmessage = function (event) {
  if (!event.data.hasOwnProperty('audioData')) {
    console.error('expected audioData, got', event.data)
  }
  chromagram.processAudioFrame(event.data.audioData)

  if (!chromagram.isReady()) return

  const currentChroma = chromagram.getChromagram()

  let message = {
    currentChroma: currentChroma,
    playbackTime: event.data.playbackTime
  }

  if (volumeLevel(event.data.audioData) > VOLUME_THRESHOLD) {
    chordDetector.detectChord(currentChroma)
    Object.assign(message, {
      chord: {
        rootNote: chordDetector.rootNote(),
        quality: chordDetector.quality(),
        intervals: chordDetector.intervals()
      }
    })
  }

  self.postMessage(message) // eslint-disable-line no-use-before-define
}

// don't bother to output anything, will be connected in parallel to
// other path to the speakers.  This will avoid pop and glitches in the
// audio that we would hear if we put this in the audio path.
export default class VolumeMeterNode {
  constructor (audioContext, clipLevel = 0.98, averaging = 0.95, clipLag = 750) {
    this.audioContext = audioContext
    this.clipLevel = clipLevel
    this.averaging = averaging
    this.clipLag = clipLag

    this.clipping = false
    this.lastClip = 0
    this.volume = 0
  }

  checkClipping () {
    console.log('checkClipping')
    if (!this.clipping) {
      return false
    }
    if ((this.lastClip + this.clipLag) < window.performance.now()) {
      this.clipping = false
    }
    return this.clipping
  }

  onAudioProcess (event) {
    let inputBuffer = event.inputBuffer

    var buf = inputBuffer.getChannelData(0)
    var bufLength = buf.length
    var sum = 0
    var x

    // Do a root-mean-square on the samples: sum up the squares...
    for (let ii = 0; ii < bufLength; ii++) {
      x = buf[ii]
      if (Math.abs(x) >= this.clipLevel) {
        this.clipping = true
        this.lastClip = window.performance.now()
      }
      sum += x * x
    }

    // ... then take the square root of the sum.
    let rms = Math.sqrt(sum / bufLength)

    // Now smooth this out with the averaging factor applied
    // to the previous sample - take the max here because we
    // want "fast attack, slow release."

    this.volume = Math.max(rms, this.volume * this.averaging)
  }
}

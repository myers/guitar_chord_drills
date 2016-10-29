export default class VolumeMeterNode {
  constructor(audioContext, clipLevel = 0.98, averaging = 0.95, clipLag = 750) {
    this.audioContext = audioContext
    this.clipLevel = clipLevel
    this.averaging = averaging
    this.clipLag = clipLag

    this.clipping = false
    this.lastClip = 0
    this.volume = 0

    this.processor = audioContext.createScriptProcessor(512)
    this.processor.onaudioprocess = (event) => this.volumeAudioProcess(event)
  }

  connect(node) {
    this.processor.connect(node)
  }

  disconnect() {
    this.processor.disconnect()
  }

  checkClipping() {
    console.log("checkClipping")
    if (!this.clipping)
      return false
    if ((this.lastClip + this.clipLag) < window.performance.now())
      this.clipping = false
    return this.clipping
  }

  volumeAudioProcess(event) {
    let inputBuffer = event.inputBuffer;
    let outputBuffer = event.outputBuffer;

    // Loop through the output channels (in this case there is only one)
    for (let channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
      outputBuffer.copyToChannel(inputBuffer.getChannelData(channel), channel)
    }

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
    let rms =  Math.sqrt(sum / bufLength)

    // Now smooth this out with the averaging factor applied
    // to the previous sample - take the max here because we
    // want "fast attack, slow release."
    this.volume = Math.max(rms, this.volume * this.averaging)
  }
}
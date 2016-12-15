import chai, { expect } from "chai"
import { describe, it, beforeEach } from "mocha"
import { spy } from "sinon"
import sinonChai from "sinon-chai"
chai.use(sinonChai)

import ChromagramWatcher from "../components/ChromagramWatcher"


describe("ChromagramWatcher", () => {
  describe("#actOnChord", () => {
    let store

    beforeEach(() => {
      store = {}
      store.dispatch = spy()
    })


    it("should remember when it first hears a chord", () => {
      const cw = new ChromagramWatcher({})

      cw.actOnChord({chord: {rootNote: "E"}, playbackTime: 0})
      expect(cw.currentChord).to.eql({rootNote: "E"})
      expect(cw.chordPlayingSince).to.eql(0)
      expect(cw.dispatchedAction).to.equal(false)
    })

    it("should dispatch an action when the chord has played past the threshold ", () => {

      const cw = new ChromagramWatcher({}, {store: store})

      cw.actOnChord({chord: {rootNote: "E"}, playbackTime: 0})
      cw.actOnChord({chord: {rootNote: "E"}, playbackTime: 0.1})
      expect(cw.currentChord).to.eql({rootNote: "E"})
      expect(cw.chordPlayingSince).to.equal(0)
      expect(cw.dispatchedAction).to.equal(true)

      expect(store.dispatch).to.have.been.calledWith({
        type: "CHORD_PLAYING",
        payload: { chord: { rootNote: "E" } }
      })
    })

    it("should change chord if new chord is heard", () => {

      const cw = new ChromagramWatcher({}, {store: store})

      cw.actOnChord({chord: {rootNote: "E"}, playbackTime: 0})
      cw.actOnChord({chord: {rootNote: "E"}, playbackTime: 0.1})
      cw.actOnChord({chord: {rootNote: "C"}, playbackTime: 1})
      expect(cw.currentChord).to.eql({rootNote: "C"})
      expect(cw.chordPlayingSince).to.equal(1)
      expect(cw.dispatchedAction).to.equal(false)
    })

    it("should reset if no chord is heard", () => {
      const cw = new ChromagramWatcher({})

      cw.actOnChord({chord: {rootNote: "E"}, playbackTime: 0})
      cw.actOnChord({playbackTime: 0.1})
      expect(cw.currentChord).to.eql(null)
      expect(cw.chordPlayingSince).to.equal(null)
      expect(cw.dispatchedAction).to.equal(false)
    })

  })
})

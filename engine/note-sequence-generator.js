import { tones, scales, chords } from '../constants'
import Note from './note'

export default class NoteSequenceGenerator {
  getScaleNotes(scaleName, note) {
    const scaleDistances = scales[scaleName]
    const tonicIndex = tones.indexOf(note.noteName)
    const tonesStartingFromTonic = tones.map(
      (_, i) => tones[(tonicIndex + i) % tones.length]
    )

    const notes = [note]
    let position = 0
    scaleDistances.forEach((scaleDistance, index) => {
      position = (position + scaleDistance) % tonesStartingFromTonic.length
      notes.push(
        new Note({
          noteName: tonesStartingFromTonic[position],
          octave: this.getOctave(tonicIndex, note.octave, tonesStartingFromTonic[position])
        })
      )
    })

    return notes
  }

  getOctave(tonicIndex, noteOctave, noteName) {
    return noteOctave + (tones.indexOf(noteName) <= tonicIndex ? 1 : 0)
  }

  getChordNotes(chordName, tone) {
    const noteDistances = chords[chordName]
    const currentToneIndex = tones.indexOf(tone)
    const tonesStartingInSelected = tones.map(
      (_, i) => tones[(currentToneIndex + i) % tones.length]
    )

    const notes = [tonesStartingInSelected[0]]
    let cursor = 0
    noteDistances.forEach((distance) => {
      cursor = (cursor + distance) % tonesStartingInSelected.length
      notes.push(tonesStartingInSelected[cursor])
    })

    return notes
  }
}

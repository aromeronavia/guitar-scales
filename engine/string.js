import { tones, scales, chords, DISPLAY_MODES } from '@/constants'
import Note from '@/engine/note'

const NUMBER_OF_NOTES = 12
const NUMBER_OF_FRETS = 13

export default class StringBuilder {
  build(note) {
    const tonicIndex = tones.indexOf(note.noteName)

    const stringNotes = [note]
    for (let i = 1; i < NUMBER_OF_FRETS; i++) {
      const noteName = tones[(tonicIndex + i) % NUMBER_OF_NOTES]
      let octave = note.octave + (tones.indexOf(noteName) <= tonicIndex ? 1 : 0)
      stringNotes.push(
        new Note({
          noteName,
          octave
        })
      )
    }

    return stringNotes
  }
  getNotes(scaleName, tone) {
    const noteDistances = scales[scaleName]
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

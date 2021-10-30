import NoteSequenceGenerator from '../engine/note-sequence-generator'
import Note from '../engine/note'

describe('Note sequence generator', () => {
  let generator

  beforeEach(() => {
    generator = new NoteSequenceGenerator()
  })

  const assertNote = (note, noteName, octave) => {
    expect(note.noteName).toEqual(noteName)
    expect(note.octave).toEqual(octave)
  }

  it('should generate the notes for A ionian', () => {
    const notes = generator.getScaleNotes('ionian', new Note({ noteName: 'A' }))

    assertNote(notes[0], 'A', 4)
    assertNote(notes[1], 'B', 4)
    assertNote(notes[2], 'C#', 5)
    assertNote(notes[3], 'D', 5)
    assertNote(notes[4], 'E', 5)
    assertNote(notes[5], 'F#', 5)
    assertNote(notes[6], 'G#', 5)
    assertNote(notes[7], 'A', 5)
  })
})

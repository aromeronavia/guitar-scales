import StringBuilder from '../engine/string-builder'
import Note from '../engine/note'

describe('String builder', () => {
  let builder

  const assertNote = (note, name) => {
    expect(note.noteName).toEqual(name)
  }

  beforeEach(() => {
    builder = new StringBuilder()
  })

  it('should build string with all notes starting from A', () => {
    const notes = builder.build(new Note({ noteName: 'A' }))

    console.warn(notes)
    assertNote(notes[0], 'A')
    assertNote(notes[1], 'A#')
    assertNote(notes[2], 'B')
    assertNote(notes[3], 'C')
    assertNote(notes[4], 'C#')
    assertNote(notes[5], 'D')
    assertNote(notes[6], 'D#')
    assertNote(notes[7], 'E')
    assertNote(notes[8], 'F')
    assertNote(notes[9], 'F#')
    assertNote(notes[10], 'G')
    assertNote(notes[11], 'G#')
    assertNote(notes[12], 'A')
  })

  it('should build string with all notes starting from C', () => {
    const notes = builder.build(new Note({ noteName: 'C' }))

    console.warn(notes)
    assertNote(notes[0], 'C')
    assertNote(notes[1], 'C#')
    assertNote(notes[2], 'D')
    assertNote(notes[3], 'D#')
    assertNote(notes[4], 'E')
    assertNote(notes[5], 'F')
    assertNote(notes[6], 'F#')
    assertNote(notes[7], 'G')
    assertNote(notes[8], 'G#')
    assertNote(notes[9], 'A')
    assertNote(notes[10], 'A#')
    assertNote(notes[11], 'B')
    assertNote(notes[12], 'C')
  })
})

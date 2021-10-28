import { tones, FRET_COUNT } from '@/constants'
import Note from '@/engine/note'


export default class StringBuilder {
  build(note) {
    const tonicIndex = tones.indexOf(note.noteName);

    const stringNotes = [note];
    for (let i = 1; i < FRET_COUNT; i++) {
      const noteName = tones[(tonicIndex + i) % tones.length];
      let octave = note.octave + (tones.indexOf(noteName) <= tonicIndex ? 1 : 0);
      stringNotes.push(
        new Note({
          noteName,
          octave
        })
      )
    }

    return stringNotes;
  }
}

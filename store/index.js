import { DISPLAY_MODES } from '/constants'
import StringBuilder from '@/engine/string-builder'
import NoteSequenceGenerator from '@/engine/note-sequence-generator'
import Note from '@/engine/note'

const E_STRING = new Note({ noteName: 'E', octave: 5 })
const B_STRING = new Note({ noteName: 'B', octave: 4 })
const G_STRING = new Note({ noteName: 'G', octave: 4 })
const D_STRING = new Note({ noteName: 'D', octave: 4 })
const A_STRING = new Note({ noteName: 'A', octave: 3 })
const SECOND_E_STRING = new Note({ noteName: 'E', octave: 3 })

const builder = new StringBuilder()
const noteSequenceGenerator = new NoteSequenceGenerator()

export const state = () => ({
  mode: DISPLAY_MODES.SCALE,
  tone: 'E',
  scale: 'ionian',
  chord: 'major',
  strings: [E_STRING, B_STRING, G_STRING, D_STRING, A_STRING, SECOND_E_STRING],
  stringNotes: [
    builder.build(E_STRING),
    builder.build(B_STRING),
    builder.build(G_STRING),
    builder.build(D_STRING),
    builder.build(A_STRING),
    builder.build(SECOND_E_STRING)
  ],
  chordNotes: noteSequenceGenerator.getChordNotes(
    'major',
    new Note({ noteName: 'E' })
  ),
  scaleNotes: noteSequenceGenerator.getScaleNotes(
    'ionian',
    new Note({ noteName: 'E' })
  )
})

export const mutations = {
  setMode(state, mode) {
    state.mode = mode
  },
  setTone(state, tone) {
    state.tone = tone
    state.scaleNotes = noteSequenceGenerator.getScaleNotes(
      state.scale,
      new Note({ noteName: tone })
    )
    state.chordNotes = noteSequenceGenerator.getChordNotes(
      state.chord,
      new Note({ noteName: tone })
    )
  },
  setScale(state, scale) {
    state.scale = scale
    console.log(scale)
    state.scaleNotes = noteSequenceGenerator.getScaleNotes(
      scale,
      new Note({ noteName: state.tone })
    )
  },
  setChord(state, chord) {
    state.chord = chord
    state.chordNotes = noteSequenceGenerator.getChordNotes(
      chord,
      new Note({ noteName: state.tone })
    )
  },
  setStrings(state, strings) {
    state.strings = strings
    state.stringNotes = strings.map((note) =>
      builder.build(note, new Note({ noteName: state.tone }))
    )
  }
}

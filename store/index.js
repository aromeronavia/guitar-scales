import { DISPLAY_MODES } from '/constants';
import StringBuilder from "@/engine/string-builder";
import NoteSequenceGenerator from '@/engine/note-sequence-generator';
import Note from "@/engine/note";

const E_STRING = new Note({ noteName: "E", octave: 5 });
const B_STRING = new Note({ noteName: "B", octave: 4 });
const G_STRING = new Note({ noteName: "G", octave: 4 });
const D_STRING = new Note({ noteName: "D", octave: 4 });
const A_STRING = new Note({ noteName: "A", octave: 3 });
const SECOND_E_STRING = new Note({ noteName: "E", octave: 3 });

const builder = new StringBuilder();
const noteSequenceGenerator = new NoteSequenceGenerator();

export const state = () => ({
  mode: DISPLAY_MODES.SCALE,
  tone: "E",
  scale: "ionian",
  chord: "major",
  strings: [
    E_STRING,
    B_STRING,
    G_STRING,
    D_STRING,
    A_STRING,
    SECOND_E_STRING,
  ],
  stringNotes: [
    builder.build(E_STRING),
    builder.build(B_STRING),
    builder.build(G_STRING),
    builder.build(D_STRING),
    builder.build(A_STRING),
    builder.build(SECOND_E_STRING),
  ],
  chordNotes: noteSequenceGenerator.getChordNotes("major", "E"),
  scaleNotes: noteSequenceGenerator.getScaleNotes("ionian", "E")
});

export const mutations = {
  setMode(state, mode) {
    state.mode = mode;
  },
  setTone(state, tone) {
    state.tone = tone;
    state.scaleNotes = noteSequenceGenerator.getScaleNotes(state.scale, tone);
    state.chordNotes = noteSequenceGenerator.getChordNotes(state.chord, tone);
  },
  setScale(state, scale) {
    state.scale = scale;
    console.log(scale);
    state.scaleNotes = noteSequenceGenerator.getScaleNotes(scale, state.tone);
  },
  setChord(state, chord) {
    state.chord = chord;
    state.chordNotes = noteSequenceGenerator.getChordNotes(chord, state.tone);
  },
  setStrings(state, strings) {
    state.strings = strings;
    state.stringNotes = strings.map(note => builder.build(note, state.tone));
  },
}

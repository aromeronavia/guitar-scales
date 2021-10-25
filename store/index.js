import { DISPLAY_MODES } from '/constants';
import StringBuilder from "@/engine/string";
import Note from "@/engine/note";

const builder = new StringBuilder();
const E_STRING = new Note({ noteName: "E", octave: 5 });
const B_STRING = new Note({ noteName: "B", octave: 4 });
const G_STRING = new Note({ noteName: "G", octave: 4 });
const D_STRING = new Note({ noteName: "D", octave: 4 });
const A_STRING = new Note({ noteName: "A", octave: 3 });
const SECOND_E_STRING = new Note({ noteName: "E", octave: 3 });

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
  ]
});

export const mutations = {
  setMode(state, mode) {
    state.mode = mode;
  },
  setTone(state, tone) {
    state.tone = tone;
  },
  setScale(state, scale) {
    state.scale = scale;
  },
  setChord(state, chord) {
    state.chord = chord;
  },
  setStrings(state, strings) {
    state.strings = strings;
  },
}

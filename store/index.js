export const state = () => ({
  mode: "scale",
  tone: "E",
  scale: "ionian",
  chord: "major",
  strings: ["E", "A", "D", "G", "B", "E"],
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

export const tones = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const ionian =      [2, 2, 1, 2, 2, 2, 1];
const dorian =      [2, 1, 2, 2, 2, 1, 2];
const phrygian =    [1, 2, 2, 2, 1, 2, 2];
const lydian =      [2, 2, 2, 1, 2, 2, 1];
const mixolydian =  [2, 2, 1, 2, 2, 1, 2];
const aeolian =     [2, 1, 2, 2, 1, 2, 2];
const locrian =     [1, 2, 2, 1, 2, 2, 2];

export const scales = {
  ionian,
  dorian,
  phrygian,
  lydian,
  mixolydian,
  aeolian,
  locrian
};

const major =           [4, 3];
const major7 =          [4, 3, 4];
const major9 =          [4, 3, 4, 3];
const major11 =         [4, 3, 4, 3, 3];
const dominant7 =       [4, 3, 3];
const diminished =      [3, 3, 3];
const halfDiminished =  [3, 3, 4];
const minor =           [3, 4];
const minor7 =          [3, 4, 3];
const minor9 =          [3, 4, 3, 4];
const minor11 =         [3, 4, 3, 4, 3];

export const chords = {
  major,
  major7,
  major9,
  major11,
  dominant7,
  diminished,
  halfDiminished,
  minor,
  minor7,
  minor9,
  minor11,
};

export const DISPLAY_MODES = {
  CHORD: "CHORD",
  SCALE: "SCALE",
};

export const noteToFrequency = {
  "C": 523.25,
  "C#": 554.37,
  "D": 587.33,
  "D#": 622.25,
  "E": 659.25,
  "F": 698.46,
  "F#": 739.99,
  "G": 783.99,
  "G#": 830.61,
  "A": 880.00,
  "A#": 932.33,
  "B": 987.77
};

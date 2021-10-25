import Note from './note';

export default [
  {
    id: "guitar-standard",
    label: "Guitar (Standard tuning)",
    strings: [
      new Note({ noteName: "E", octave: 5 }),
      new Note({ noteName: "B", octave: 4 }),
      new Note({ noteName: "G", octave: 4 }),
      new Note({ noteName: "D", octave: 4 }),
      new Note({ noteName: "A", octave: 3 }),
      new Note({ noteName: "E", octave: 3 }),
    ],
  },
  {
    id: "ukulele",
    label: "Ukulele",
    strings: [
      new Note({ noteName: "A", octave: 5 }),
      new Note({ noteName: "E", octave: 5 }),
      new Note({ noteName: "C", octave: 5 }),
      new Note({ noteName: "G", octave: 5 }),
    ]
  },
];

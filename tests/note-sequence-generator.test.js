import NoteSequenceGenerator from "../engine/note-sequence-generator";

describe("Note sequence generator", () => {
  let generator;

  beforeEach(() => {
    generator = new NoteSequenceGenerator();
  });

  it('should generate the notes for A ionian', () => {
    const notes = generator.getScaleNotes("ionian", "A");

    expect(notes).toEqual(["A", "B", "C#", "D", "E", "F#", "G#", "A"]);
  });
});

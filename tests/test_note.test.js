import Note from "../engine/note";

test("test getFrequency", () => {
  const c4 = new Note("C", 4);
  expect(c4.getFrequency()).toBe(261.63);

  const dSharp6 = new Note("D#", 6);
  expect(dSharp6.getFrequency()).toBe(1244.51);

  const e0 = new Note("E", 0);
  expect(e0.getFrequency()).toBe(20.60);
});

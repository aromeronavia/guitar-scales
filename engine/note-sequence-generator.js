import { tones, scales, chords } from '@/constants'

export default class NoteSequenceGenerator {
  getScaleNotes(scaleName, tone) {
    const noteDistances = scales[scaleName];
    const currentToneIndex = tones.indexOf(tone);
    const tonesStartingInSelected = tones.map(
      (_, i) => tones[(currentToneIndex + i) % tones.length]
    );

    const notes = [tonesStartingInSelected[0]];
    let cursor = 0;
    noteDistances.forEach((distance) => {
      cursor = (cursor + distance) % tonesStartingInSelected.length;
      notes.push(tonesStartingInSelected[cursor]);
    })

    return notes;
  }

  getChordNotes(chordName, tone) {
    const noteDistances = chords[chordName];
    const currentToneIndex = tones.indexOf(tone);
    const tonesStartingInSelected = tones.map(
      (_, i) => tones[(currentToneIndex + i) % tones.length]
    );

    const notes = [tonesStartingInSelected[0]];
    let cursor = 0;
    noteDistances.forEach((distance) => {
      cursor = (cursor + distance) % tonesStartingInSelected.length;
      notes.push(tonesStartingInSelected[cursor]);
    })

    return notes;
  }
}

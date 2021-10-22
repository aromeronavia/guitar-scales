import { tones, A4_FREQUENCY } from '../constants';


export default class Note {
  constructor(noteName, octave) {
    this.noteName = noteName;
    this.octave = octave;
  }

  getFrequency() {
    const power = this._getDistanceFromA4() / tones.length;
    return parseFloat((A4_FREQUENCY * Math.pow(2, power)).toFixed(2));
  }

  _getDistanceFromA4() {
    const a4Octave = 4;
    const a4NoteName = "A";

    const octaveDifference = (this.octave - a4Octave) * tones.length;
    const toneDifference =  tones.indexOf(this.noteName) - tones.indexOf(a4NoteName);

    return octaveDifference + toneDifference;
  }
}

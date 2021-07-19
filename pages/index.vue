<template>
  <div class="container">
    <ul class="fret-numbers">
      <li class="fret-number" v-for="(n, i) in 13" :key="i + 1">
        {{ i }}
      </li>
    </ul>
    <div class="strings">
      <div class="string" />
      <div class="string" />
      <div class="string" />
      <div class="string" />
      <div class="string" />
      <div class="string" />
    </div>

    <label>Note</label>
    <select v-model="currentTone">
      <option
        v-for="tone in tones"
        :key="tone"
        :value="tone"
        :selected="tone === currentTone"
        >{{ tone }}</option
      >
    </select>

    <br />

    <label>Scale Mode</label>
    <select v-model="currentScale">
      <option
        v-for="scale in scalesOptions"
        :key="scale"
        :value="scale"
        :selected="scale === currentScale"
        >{{ scale }}</option
      >
    </select>

    <label>Chord</label>
    <select v-model="currentChord">
      <option
        v-for="chord in chordsOptions"
        :key="chord"
        :value="chord"
        :selected="chord === currentChord"
        >{{ chord }}</option
      >
    </select>
  </div>
</template>

<script>
const NUMBER_OF_FRETS = 13;
const NUMBER_OF_NOTES = 12;

const FRET_SIZE = 64;
const DOT_SIZE = 28;

const DISPLAY_MODES = {
  CHORD: "CHORD",
  SCALE: "SCALE",
};

const tones = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const buildString = note => {
  const index = tones.indexOf(note);
  const stringNotes = [];

  for (let i = 0; i < NUMBER_OF_FRETS; i++) {
    stringNotes.push(tones[(index + i) % NUMBER_OF_NOTES]);
  }

  return stringNotes;
};

const eString = buildString("E");
const bString = buildString("B");
const gString = buildString("G");
const dString = buildString("D");
const aString = buildString("A");

const guitarStrings = [eString, bString, gString, dString, aString, eString];

const ionian =      [2, 2, 1, 2, 2, 2, 1];
const dorian =      [2, 1, 2, 2, 2, 1, 2];
const phrygian =    [1, 2, 2, 2, 1, 2, 2];
const lydian =      [2, 2, 2, 1, 2, 2, 1];
const mixolydian =  [2, 2, 1, 2, 2, 1, 2];
const aeolian =     [2, 1, 2, 2, 1, 2, 2];
const locrian =     [1, 2, 2, 1, 2, 2, 2];

const scales = {
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
const diminished =      [3, 3, 3, 3];
const halfDiminished =  [3, 3, 4];
const minor =           [3, 4];
const minor7 =          [3, 4, 3];
const minor9 =          [3, 4, 3, 4];
const minor11 =         [3, 4, 3, 4, 3];

const chords = {
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

export default {
  data: function() {
    return {
      tones,
      scalesOptions: Object.keys(scales),
      chordsOptions: Object.keys(chords),
      currentTone: "E",
      currentScale: "dorian",
      currentChord: "major",
      displayMode: DISPLAY_MODES.SCALE,
    };
  },
  methods: {
    buildFret(index) {
      const fret = document.createElement("div");
      fret.className = "fret";
      fret.style.marginLeft = `${index * FRET_SIZE}px`;

      return fret;
    },
    buildDot(index, note, className=undefined) {
      const dot = document.createElement("div");
      dot.className = "dot";
      if (className) {
        dot.className = [...dot.className.split(" "), className].join(" ");
      }
      dot.style.marginLeft = `${(index * FRET_SIZE) + DOT_SIZE - FRET_SIZE}px`;

      const tooltip = document.createElement("span");
      tooltip.className = "tooltip";
      tooltip.innerText = note;
      dot.appendChild(tooltip);

      return dot;
    },
    resetStrings() {
      const stringElements = document.getElementsByClassName("string");
      stringElements.forEach(element => {
        element.innerHTML = "";
      });
    },
    getNotesInCurrentScale() {
      const currentToneIndex = tones.indexOf(this.currentTone);
      const tonesStartingInSelected = tones.map((_, i) => tones[(currentToneIndex + i) % tones.length]);

      const notesInScale = [tonesStartingInSelected[0]];
      const selectedScale = scales[this.currentScale];
      let cursor = 0;
      for (let i = 0; i < selectedScale.length; i ++) {
        cursor = (cursor + selectedScale[i]) % tonesStartingInSelected.length;
        notesInScale.push(tonesStartingInSelected[cursor]);
      }

      return notesInScale;
    },
    getNotesInCurrentChord() {
      const currentToneIndex = tones.indexOf(this.currentTone);
      const tonesStartingInSelected = tones.map((_, i) => tones[(currentToneIndex + i) % tones.length]);

      const notesInChord = [tonesStartingInSelected[0]];
      const selectedChord = chords[this.currentChord];
      let cursor = 0;
      for (let i = 0; i < selectedChord.length; i ++) {
        cursor = (cursor + selectedChord[i]) % tonesStartingInSelected.length;
        notesInChord.push(tonesStartingInSelected[cursor]);
      }

      return notesInChord;
    },
    getChordFormat(notesInChord) {
      const formats = [
        "dot--root",
        "dot--secondNote",
        "dot--thirdNote",
        "dot--fourthNote",
        "dot--fifthNote",
        "dot--sixthNote",
      ];

      return notesInChord.reduce((acc, note, noteIndex) => ({ ...acc, [note]: formats[noteIndex % formats.length] }), {});
    },
    _drawNotes(notes, noteFormat={}) {
      /*
        notes: Array of notes
        noteFormat: An object associating each note to its format (extra className)
      */
      guitarStrings.forEach((string, stringIndex) => {
        const stringElement = document.getElementsByClassName("string")[
          stringIndex
        ];
        string.forEach((note, noteIndex) => {
          if (notes.includes(note)) {
            const dot = this.buildDot(noteIndex, note, noteFormat[note]);
            stringElement.appendChild(dot);
          }
        });
      });
    },
    drawScale() {
      this.displayMode = DISPLAY_MODES.SCALE;
      this.resetStrings();

      const notes = this.getNotesInCurrentScale();
      this._drawNotes(notes);
    },
    drawChord() {
      this.displayMode = DISPLAY_MODES.CHORD;
      this.resetStrings();

      const notes = this.getNotesInCurrentChord();
      const chordFormat = this.getChordFormat(notes);
      this._drawNotes(notes, chordFormat);
    }
  },
  watch: {
    currentTone: function() {
      if (this.displayMode === DISPLAY_MODES.SCALE) {
        this.drawScale();
      } else {
        this.drawChord();
      }
    },
    currentScale: function() {
      this.drawScale();
    },
    currentChord: function() {
      this.drawChord();
    },
  },
  mounted: function() {
    for (let i = 0; i < NUMBER_OF_FRETS; i++) {
      const fret = this.buildFret(i);
      const container = document.getElementsByClassName("strings")[0];
      container.appendChild(fret);
    }

    this.drawScale();
  }
};
</script>

<style>
html {
  background-color: #dfdfdf;
  padding-left: 100px;
}

.fret-numbers {
  padding: 0;
}

.fret-number {
  display: inline;
  margin-left: 48px;
}

.fret-number:first-child {
  margin-left: 36px;
}

.container {
  position: relative;
}

.strings {
  display: flex;
  justify-content: center;
  margin-top: 22px;
  margin-left: 64px;
  flex-direction: column;
  position: relative;
}

.dot {
  width: 16px;
  height: 16px;
  margin-top: -4px;
  border-radius: 100%;
  background-color: black;
  margin-left: 28px;
  position: absolute;
}

/* TODO: Choose a better color palette */
.dot--root {
  background-color: red;
}
.dot--secondNote {
  background-color: blue;
}
.dot--thirdNote {
  background-color: green;
}
.dot--fourthNote {
  background-color: yellow;
}
.dot--fifthNote {
  background-color: purple;
}
.dot--sixthNote {
  background-color: orange;
}

.string {
  display: block;
  width: 776px;
  height: 8px;
  background-color: black;
  border-radius: 4px;
  margin-bottom: 24px;
  position: relative;
}

.fret {
  position: absolute;
  height: 168px;
  border-radius: 4px;
  top: 0;
  width: 8px;
  background-color: brown;
}

.tooltip {
  visibility: hidden;
  width: 30px;
  background-color: #AAA;
  color: #fff;
  text-align: center;
  border-radius: 50px;
  padding: 5px 0;
  margin: 20px 20px;

  position: absolute;
  z-index: 1;
}

.dot:hover .tooltip {
  visibility: visible;
}
</style>

<template>
  <div>
    <div class="fret-numbers">
      <span class="fret-number" v-for="(n, i) in 13" :key="i + 1">
        {{ i }}
      </span>
    </div>
    <div id="strings" class="strings" />
  </div>
</template>

<script>
import { tones, scales, chords, DISPLAY_MODES } from '/constants';

const NUMBER_OF_FRETS = 13;
const NUMBER_OF_NOTES = 12;

const FRET_SIZE = 64;
const STRING_SEPARATION = 24;
const STRING_THICKNESS = 8;
const DOT_SIZE = 28;

const buildString = note => {
  const index = tones.indexOf(note);
  const stringNotes = [];

  for (let i = 0; i < NUMBER_OF_FRETS; i++) {
    stringNotes.push(tones[(index + i) % NUMBER_OF_NOTES]);
  }

  return stringNotes;
};

export default {
  computed: {
    tone() {
      return this.$store.state.tone;
    },
    scale() {
      return this.$store.state.scale;
    },
    chord() {
      return this.$store.state.chord;
    },
    strings() {
      return this.$store.state.strings;
    },
    mode() {
      return this.$store.state.mode;
    }
  },
  methods: {
    buildFret(index) {
      const fret = document.createElement("div");
      fret.className = "fret";
      fret.style.marginLeft = `${index * FRET_SIZE}px`;
      fret.style.height = `${(STRING_THICKNESS * this.strings.length) + (STRING_SEPARATION * (this.strings.length-1))}px`;

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
    resetFretboard() {
      const container = document.getElementById("strings");
      container.innerHTML = "";

      this.strings.forEach((string, index) => {
        const stringElem = document.createElement("div");
        stringElem.className = "string";

        if (index === this.strings.length - 1) {
          stringElem.style["margin-bottom"] = 0;
        }

        container.appendChild(stringElem);
      });

      for (let i = 0; i < NUMBER_OF_FRETS; i++) {
        const fret = this.buildFret(i);
        container.appendChild(fret);
      }
    },
    _getNotes(noteDistances) {
      const currentToneIndex = tones.indexOf(this.tone);
      const tonesStartingInSelected = tones.map((_, i) => tones[(currentToneIndex + i) % tones.length]);

      const notes = [tonesStartingInSelected[0]];
      let cursor = 0;
      noteDistances.forEach((distance) => {
        cursor = (cursor + distance) % tonesStartingInSelected.length;
        notes.push(tonesStartingInSelected[cursor]);
      });

      return notes;
    },
    getNotesInScale() {
      const selectedScale = scales[this.scale];
      return this._getNotes(selectedScale);
    },
    getNotesInChord() {
      const selectedChord = chords[this.chord];
      return this._getNotes(selectedChord);
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
    _drawNotes(scaleNotes, noteFormat={}) {
      /*
        scaleNotes: Array of scaleNotes
        noteFormat: An object associating each note to its format (extra className)
      */
      this.strings.forEach((stringNote, stringIndex) => {
        const stringElement = document.getElementsByClassName("string")[
          stringIndex
        ];
        const string = buildString(stringNote);
        string.forEach((currentNote, noteIndex) => {
          if (scaleNotes.includes(currentNote)) {
            const dot = this.buildDot(noteIndex, currentNote, noteFormat[currentNote]);

            stringElement.appendChild(dot);
          }
        });
      });
    },
    drawScale() {
      this.$store.commit("setMode", DISPLAY_MODES.SCALE);
      this.resetFretboard();

      const notes = this.getNotesInScale();
      this._drawNotes(notes);
    },
    drawChord() {
      this.$store.commit("setMode", DISPLAY_MODES.CHORD);
      this.resetFretboard();

      const notes = this.getNotesInChord();
      const chordFormat = this.getChordFormat(notes);
      this._drawNotes(notes, chordFormat);
    }
  },
  watch: {
    tone() {
      if (this.mode === DISPLAY_MODES.SCALE) {
        this.drawScale();
      } else {
        this.drawChord();
      }
    },
    scale() {
      this.drawScale();
    },
    chord() {
      this.drawChord();
    },
    strings() {
      this.drawScale();
    }
  },
  mounted: function() {
    this.resetFretboard();
    this.drawScale();
  }
};
</script>

<style>
html {
  background-color: #f3f3f3;
}

.fret-numbers {
  margin-top: 20px;
}

.fret-number {
  list-style-type: none;
  margin-left: 50px;
}

.fret-number:first-child {
  margin-left: -56px;
}

.container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center
}

.strings {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 28px;
  flex-direction: column;
  position: relative;
  width: min-content;
  background: url('http://i.stack.imgur.com/jGlzr.png') no-repeat;
}

.dot {
  width: 16px;
  height: 16px;
  margin-top: -4px;
  border-radius: 100%;
  background-color: #0d1009;
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
  height: 5px;
  background-color: #c9ae5d;
  border-radius: 4px;
  margin-bottom: 28px;
  position: relative;
}

.fret {
  position: absolute;
  border-radius: 4px;
  top: 0;
  width: 8px;
  background-color: #0d090a;
}

.tooltip {
  visibility: hidden;
  width: 30px;
  background-color: #7692ff;
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

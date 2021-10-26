<template>
  <div class="fretboard">
    <div class="fret-numbers">
      <span class="fret-number" v-for="(n, i) in frets" :key="i + 1">
        {{ i }}
      </span>
    </div>
    <Strings
      ref="strings"
      :key="stringsKey"
      :frets="frets"
      :scaleNotes="scaleNotes"
      :chordNotes="chordNotes"
      :chordFormat="chordFormat"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { tones, scales, chords } from '@/constants';

export default {
  data: function () {
    return {
      frets: 13,
      stringsKey: 0,
    }
  },
  computed: {
    ...mapState({
      tone: 'tone',
      scale: 'scale',
      chord: 'chord',
      strings: 'strings',
      mode: 'mode',
      scaleNotes: 'scaleNotes'
    }),
    chordNotes: function () {
      return this.getNotesInChord();
    },
    chordFormat: function () {
      return this.getChordFormat(this.chordNotes);
    }
  },
  methods: {
    getChordFormat(notesInChord) {
      const formats = [
        "dot--root",
        "dot--secondNote",
        "dot--thirdNote",
        "dot--fourthNote",
        "dot--fifthNote",
        "dot--sixthNote",
      ];

      // TODO: Refactor this to make it work again
      // return notesInChord.reduce((acc, note, noteIndex) => ({ ...acc, [note]: formats[noteIndex % formats.length] }), {});
      return {};
    },
    getNotesInChord() {
      const selectedChord = chords[this.chord];
      // TODO: Refactor this to make it work again
      // return this._getNotes(selectedChord);
      return {};
    },
  },
};
</script>

<style>
html {
  background-color: #f3f3f3;
}

.fretboard {
  margin-right: 40px;
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
  align-items: center;
  margin: 0 100px 0 100px;
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
  cursor: pointer;
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

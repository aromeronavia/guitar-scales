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
import Vue from 'vue';
import { mapState } from 'vuex';

import { tones, scales, chords, DISPLAY_MODES } from '@/constants';
import StringComponent from "@/components/String.vue";
import FretComponent from "@/components/Fret.vue";
import Note from '@/engine/note';

const StringClass = Vue.extend(StringComponent);
const FretClass = Vue.extend(FretComponent);

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
    }),
    scaleNotes: function () {
      return this.getNotesInScale();
    },
    chordNotes: function () {
      return this.getNotesInChord();
    },
    chordFormat: function () {
      return this.getChordFormat(this.chordNotes);
    }
  },
  methods: {
    renderFret(index) {
      const instance = new FretClass({
        propsData: { index, numberOfStrings: this.strings.length }
      });
      instance.$mount();

      return instance.$el;
    },
    renderFretboard() {
      if (this.mode === DISPLAY_MODES.SCALE) {
        this.setScaleMode();
      } else {
        this.setChordMode();
      }
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
    setScaleMode() {
      this.$store.commit("setMode", DISPLAY_MODES.SCALE);
    },
    setChordMode() {
      this.$store.commit("setMode", DISPLAY_MODES.CHORD);
    },
    getNotesInScale() {
      const selectedScale = scales[this.scale];
      return this._getNotes(selectedScale);
    },
    getNotesInChord() {
      const selectedChord = chords[this.chord];
      return this._getNotes(selectedChord);
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
  },
  watch: {
    mode() {
      this.renderFretboard();
    },
    tone() {
      this.renderFretboard();
    },
    scale() {
      this.setScaleMode();
    },
    chord() {
      this.setChordMode();
    },
    strings() {
      this.renderFretboard();
    }
  },
  mounted: function() {
    this.renderFretboard();
    this.osc = null;
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.mainGainNode = this.audioContext.createGain();
    this.mainGainNode.connect(this.audioContext.destination);
    this.mainGainNode.gain.value = 1.0;
  }
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

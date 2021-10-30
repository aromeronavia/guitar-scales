<template>
  <div class="fretboard">
    <div class="fret-numbers">
      <span class="fret-number" v-for="(n, i) in frets" :key="i + 1">
        {{ i }}
      </span>
    </div>
    <Strings
      ref="strings"
      :notes="notes"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { DISPLAY_MODES } from '/constants';

export default {
  computed: {
    ...mapState({
      tone: 'tone',
      scale: 'scale',
      chord: 'chord',
      strings: 'strings',
      mode: 'mode',
      scaleNotes: 'scaleNotes',
      chordNotes: 'chordNotes'
    }),
    notes: state => {
      if (state.mode === DISPLAY_MODES.SCALE) {
        return state.scaleNotes.map(note => note.noteName)
      } else {
        return state.chordNotes.map(note => note.noteName)
      }
    }
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
  margin: 0 20px 0 20px;
}
</style>

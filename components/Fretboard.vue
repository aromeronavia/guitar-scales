<template>
  <div class="fretboard">
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
        return state.chordNotes
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

.container {
  position: relative;
  display: flex;
  align-items: center;
  margin: 0 20px 0 20px;
}
</style>

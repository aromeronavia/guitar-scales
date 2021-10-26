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
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';

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
  },
  /*methods: {
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
  }*/
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
</style>

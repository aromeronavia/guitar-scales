<template>
  <div ref="strings" class="strings">
    <String
      v-for="(string, index) in strings"
      :isLastString="index === strings.length - 1"
    >
      <template v-if="isScaleMode">
        <template v-for="(note, noteIndex) in stringNotes[index]">
          <Dot
            v-if="shouldRenderScaleDot(note, noteIndex)"
            :note="note"
            :index="noteIndex"
          />
        </template>
      </template>

      <template v-else>
        <template v-for="(note, noteIndex) in stringNotes[index]">
          <Dot
            v-if="shouldRenderChordDot(note, noteIndex)"
            :note="note"
            :index="noteIndex"
          />
        </template>
      </template>
    </String>
    <Fret
      v-for="(fret, index) in frets"
      :key="index"
      :index="index"
      :numberOfStrings="strings.length"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { DISPLAY_MODES } from "@/constants";

export default {
  props: {
    frets: {
      type: Number,
      required: true,
    },
    scaleNotes: {
      type: Array,
      required: true,
    }
  },
  computed: {
    ...mapState({
      strings: 'strings',
      stringNotes: 'stringNotes',
      chordNotes: 'chordNotes',
      isScaleMode: state => state.mode === DISPLAY_MODES.SCALE
    }),
  },
  methods: {
    shouldRenderScaleDot(note) {
      return this.scaleNotes.includes(note.noteName);
    },
    shouldRenderChordDot(note) {
      return this.chordNotes.includes(note.noteName);
    }
  },
}
</script>

<style>
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
</style>

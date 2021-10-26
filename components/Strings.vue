<template>
  <div ref="strings" class="strings">
    <String
      v-for="(string, index) in strings"
      :isLastString="index === strings.length - 1"
    >
      <template v-for="(note, noteIndex) in stringNotes[index]">
        <Dot
          v-if="shouldRenderDot(note, noteIndex)"
          :note="note"
          :index="noteIndex"
        />
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

const FRET_SIZE = 64;
const DOT_SIZE = 28;

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
  computed: mapState({
    strings: 'strings',
    stringNotes: 'stringNotes',
  }),
  methods: {
    shouldRenderDot(note) {
      return this.scaleNotes.includes(note.noteName);
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

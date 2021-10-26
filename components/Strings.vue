<template>
  <div ref="strings" class="strings">
    <String
      v-for="(string, index) in strings"
      :isLastString="index === strings.length - 1"
    >
      <Dot
        v-for="(note, index) in stringNotes[index]"
        v-if="shouldRenderDot(note, index)"
        :note="note"
        :index="index"
      />
    </String>
    <Fret
      v-for="(fret, index) in frets"
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
    },
    chordNotes: {
      required: true,
    },
    chordFormat: {
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

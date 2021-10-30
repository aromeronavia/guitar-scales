<template>
  <div ref="strings" class="strings">
    <String
      v-for="(string, index) in stringNotes"
      :isLastString="index === strings.length - 1"
      :key="`string-${index}`"
    >
      <template v-for="(note, noteIndex) in string">
        <Dot
          v-if="shouldRender(note, noteIndex)"
          :note="note"
          :index="noteIndex"
          :key="`note-${index}-${noteIndex}`"
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
import { FRET_COUNT } from "@/constants";

export default {
  data: function () {
    return {
      frets: FRET_COUNT,
    };
  },
  props: {
    notes: {
      type: Array,
      required: true,
    }
  },
  computed: {
    ...mapState({
      strings: 'strings',
      stringNotes: 'stringNotes',
    }),
  },
  methods: {
    shouldRender(note) {
      return this.notes.includes(note.noteName);
    },
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

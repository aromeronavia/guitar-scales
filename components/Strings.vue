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
import StringBuilder from "@/engine/string";

const FRET_SIZE = 64;
const STRING_SEPARATION = 24;
const STRING_THICKNESS = 8;
const DOT_SIZE = 28;

export default {
  props: {
    frets: {
      type: Number,
      required: true,
    },
    scaleNotes: {
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
    renderDot(index, note, className=undefined) {
      const dot = document.createElement("div");
      dot.className = "dot";
      if (className) {
        dot.className = [...dot.className.split(" "), className].join(" ");
      }
      dot.style.marginLeft = `${(index * FRET_SIZE) + DOT_SIZE - FRET_SIZE}px`;
      dot.addEventListener("mousedown", this.buildPlayNote(note.frequency));
      dot.addEventListener("mouseup", this.stopPlayingNote);

      const tooltip = document.createElement("span");
      tooltip.className = "tooltip";
      tooltip.innerText = note.noteName;
      dot.appendChild(tooltip);

      return dot;
    },
    buildPlayNote(frequency) {
      const this_ = this;
      return function(event) {
        event.preventDefault();

        this_.osc = this_.audioContext.createOscillator();
        this_.osc.connect(this_.mainGainNode);
        this_.osc.frequency.value = frequency;

        this_.osc.start();
      };
    },
    stopPlayingNote(event) {
      event.preventDefault();

      this.osc.stop();
    },
    shouldRenderDot(note, index) {
      return this.scaleNotes.includes(note.noteName);
    }
  },
}
</script>

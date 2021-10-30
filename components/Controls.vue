<template>
  <div class="controls">
    <label>Note</label>
    <select v-model="currentTone" @change="onChangeTone($event)">
      <option
        v-for="tone in tones"
        :key="tone"
        :value="tone"
        :selected="tone === currentTone"
        >{{ tone }}</option
      >
    </select>

    <br />

    <span>Scale</span>
    <label class="switch">
      <input type="checkbox" v-model="chordMode" @change="onChangeMode" />
      <div v-bind:class="{'slider-chord': chordMode, 'slider-scale': !chordMode}" />
    </label>
    <span>Chord</span>

    <br />

    <div v-if="chordMode">
      <label>Chord</label>
      <select @change="onChangeChord($event)">
        <option
          v-for="chord in chordsOptions"
          :key="chord"
          :value="chord"
          :selected="chord === currentChord"
        >{{ chord }}</option>
      </select>
    </div>

    <div v-else>
      <label>Scale</label>
      <select @change="onChangeScale($event)">
        <option
          v-for="scale in scalesOptions"
          :key="scale"
          :value="scale"
          :selected="scale === currentScale"
          >{{ scale }}</option>
      </select>
    </div>

    <br />

    <label>Write a comma separated list of the open string notes in your instrument</label>
    <input v-model="stringsAsText" type="text" />
    <button v-on:click="updateStrings">Change Strings!</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { tones, scales, chords, DISPLAY_MODES } from '/constants';
import Note from '/engine/note';

export default {
  data() {
    return {
      stringsAsText: "",
      tones,
      scalesOptions: Object.keys(scales),
      chordsOptions: Object.keys(chords),
      chordMode: false,
    };
  },
  computed: mapState({
    currentTone: 'tone',
    currentScale: 'scale',
    currentChord: 'chord',
  }),
  methods: {
    onChangeMode(event) {
      const mode = this.chordMode ? DISPLAY_MODES.CHORD : DISPLAY_MODES.SCALE;
      this.$store.commit("setMode", mode);
    },
    onChangeTone(event) {
      this.$store.commit("setTone", event.target.value);
    },
    onChangeScale(event) {
      this.$store.commit("setScale", event.target.value);
    },
    onChangeChord(event) {
      this.$store.commit("setChord", event.target.value);
    },
    updateStrings() {
      const parsedStrings = this.stringsAsText.trim().toUpperCase().split(",").reverse();
      const stringNotes = parsedStrings.map((noteAndOctave) => new Note({
        noteName: noteAndOctave[0],
        octave: parseInt(noteAndOctave[1])
      }));
      this.$store.commit("setStrings", stringNotes);
    },
  }
};
</script>

<style>
.controls {
  margin-top: 36px;
}

.switch {
  cursor: pointer;
  width: 80px;
  border: 2px solid black;
}

.switch input {
  display: none;
}

.slider-chord {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: black;
  border-radius: 0% 50% 50% 0%;
  margin: 2px 2px 0px 20px;
}
.slider-scale {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: black;
  border-radius: 50% 0% 0% 50%;
  margin: 2px 20px 0px 2px;
}
</style>

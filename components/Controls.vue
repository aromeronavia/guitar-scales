<template>
  <div>
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

    <label>Scale Mode</label>
    <select v-model="currentScale" @change="onChangeScale($event)">
      <option
        v-for="scale in scalesOptions"
        :key="scale"
        :value="scale"
        :selected="scale === currentScale"
        >{{ scale }}</option
      >
    </select>

    <label>Chord</label>
    <select v-model="currentChord" @change="onChangeChord($event)">
      <option
        v-for="chord in chordsOptions"
        :key="chord"
        :value="chord"
        :selected="chord === currentChord"
       >{{ chord }}</option
      >
    </select>

    <br />

    Write a comma separated list of the open string notes in your instrument
    <input v-model="stringsAsText" type="text" />
    <button v-on:click="updateStrings">Change Strings!</button>
  </div>
</template>

<script>
import { tones, scales, chords } from '/constants';

export default {
  data() {
    return {
      currentTone: this.$store.state.tone,
      currentScale: this.$store.state.scale,
      currentChord: this.$store.state.chord,
      stringsAsText: "",
      tones,
      scalesOptions: Object.keys(scales),
      chordsOptions: Object.keys(chords),
    };
  },
  methods: {
    onChangeTone(event) {
      this.currentTone = event.target.value;
      this.$store.commit("setTone", event.target.value);
    },
    onChangeScale(event) {
      this.currentScale = event.target.value;
      this.$store.commit("setScale", event.target.value);
    },
    onChangeChord(event) {
      this.currentChord = event.target.value;
      this.$store.commit("setChord", event.target.value);
    },
    updateStrings() {
      const parsedStrings = this.stringsAsText.trim().toUpperCase().split(",").reverse();
      this.$store.commit("setStrings", parsedStrings);
    },
  }
};
</script>


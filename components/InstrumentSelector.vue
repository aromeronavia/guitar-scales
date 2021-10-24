<template>
  <ul>
    <li v-on:click="setGuitar">Guitar</li>
    <li v-on:click="setUkulele">Ukulele</li>
  </ul>
</template>

<script>
import Note from "@/engine/note";

const ukeleleStrings = [
  new Note({ noteName: "A", octave: 5 }),
  new Note({ noteName: "E", octave: 5 }),
  new Note({ noteName: "C", octave: 5 }),
  new Note({ noteName: "G", octave: 5 }),
];

const guitarStrings = [
  new Note({ noteName: "E", octave: 5 }),
  new Note({ noteName: "B", octave: 4 }),
  new Note({ noteName: "G", octave: 4 }),
  new Note({ noteName: "D", octave: 4 }),
  new Note({ noteName: "A", octave: 3 }),
  new Note({ noteName: "E", octave: 3 }),
];

export default {
  methods: {
    setGuitar() {
      this._buildSetStrings(guitarStrings)();
    },
    setUkulele() {
      this._buildSetStrings(ukeleleStrings)();
    },
    _buildSetStrings(strings) {
      return () => {
        this.$store.commit("setStrings", strings);
      };
    },
  }

}
</script>


<style>
ul {
  position: relative;
  margin-right: 80px;
  padding-left: 0px;
}
li {
  cursor: pointer;
}
</style>

<template>
  <ul>
    <li v-for="preset in tuningPresets" :key="preset.id" v-on:click="buildSetStrings(preset.strings)">
      <div>{{preset.label}}</div>
    </li>
  </ul>
</template>

<script>
import tuningPresets from "@/engine/tuning-presets";

export default {
  data: () => ({
    tuningPresets,
  }),
  methods: {
    buildSetStrings(strings) {
      this.$store.commit("setStrings", strings);
    },
  }
}
</script>


<style>
ul {
  position: relative;
  margin-right: 80px;
  padding-left: 0px;
  list-style-type: none;
}
li {
  cursor: pointer;
  margin-bottom: 10px;
}
</style>

<template>
  <div class="container">
    <ul class="fret-numbers">
      <li class="fret-number" v-for="(n, i) in 12" :key="i + 1">
        {{ i }}
      </li>
    </ul>
    <div class="strings">
      <div class="string"></div>
      <div class="string"></div>
      <div class="string"></div>
      <div class="string"></div>
      <div class="string"></div>
      <div class="string"></div>
    </div>

    <label>Note</label>
    <select>
      <option value="E">E</option>
    </select>

    <br />

    <label>Scale Mode</label>
    <select>
      <option value="dorian">Dorian Scale</option>
    </select>
  </div>
</template>

<script>
const NUMBER_OF_FRETS = 13;
const TOTAL_NOTES = 12;

const tones = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const buildString = note => {
  const index = tones.indexOf(note);
  const stringNotes = [];

  for (let i = 0; i < TOTAL_NOTES; i++) {
    stringNotes.push(tones[(index + i) % TOTAL_NOTES]);
  }

  return stringNotes;
};

const eString = buildString("E");
const bString = buildString("B");
const gString = buildString("G");
const dString = buildString("D");
const aString = buildString("A");

const guitarStrings = [eString, bString, gString, dString, aString, eString];

const doryan = ["E", "F#", "G", "A", "B", "C", "D"];

export default {
  mounted: function() {
    const buildFret = i => {
      const fret = document.createElement("div");
      fret.className = "fret";
      fret.style.marginLeft = `${i * 64}px`;

      return fret;
    };

    const buildDot = i => {
      const dot = document.createElement("div");
      dot.className = "dot";
      dot.style.marginLeft = `${i * 64 + 28}px`;

      return dot;
    };

    for (let i = 0; i < NUMBER_OF_FRETS; i++) {
      const fret = buildFret(i);
      const container = document.getElementsByClassName("container")[0];
      container.appendChild(fret);
    }

    console.warn(eString);

    guitarStrings.forEach((string, index) => {
      doryan.forEach(note => {
        const fretNumber = string.indexOf(note);
        const dot = buildDot(fretNumber);
        const stringElement = document.getElementsByClassName("string")[index];
        stringElement.appendChild(dot);
      });
    });
  }
};
</script>

<style>
html {
  background-color: #dfdfdf;
  padding-left: 100px;
}

.fret-numbers {
  padding: 0;
}

.fret-number {
  display: inline;
  margin-left: 48px;
}

.fret-number:first-child {
  margin-left: 36px;
}

.container {
  position: relative;
}

.strings {
  display: flex;
  justify-content: center;
  padding-top: 22px;
  flex-direction: column;
}

.dot {
  width: 16px;
  height: 16px;
  margin-top: -4px;
  border-radius: 100%;
  background-color: black;
  margin-left: 28px;
  position: absolute;
}

.string {
  display: block;
  width: 776px;
  height: 8px;
  background-color: black;
  border-radius: 4px;
  margin-bottom: 24px;
  position: relative;
}

.fret {
  position: absolute;
  height: 168px;
  margin-top: 40px;
  border-radius: 4px;
  top: 0;
  width: 8px;
  background-color: brown;
}
</style>

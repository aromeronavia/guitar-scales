<template>
  <div class="container">
    <ul class="fret-numbers">
      <li class="fret-number" v-for="(n, i) in 12" :key="i + 1">
        {{ i }}
      </li>
    </ul>
    <div class="strings">
      <div class="string" />
      <div class="string" />
      <div class="string" />
      <div class="string" />
      <div class="string" />
      <div class="string" />
    </div>

    <label>Note</label>
    <select v-model="currentTone">
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
    <select v-model="currentScale">
      <option
        v-for="scale in scalesOptions"
        :key="scale"
        :value="scale"
        :selected="scale === currentScale"
        >{{ scale }}</option
      >
    </select>
  </div>
</template>

<script>
const NUMBER_OF_FRETS = 13;
const NUMBER_OF_NOTES = 12;

const tones = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const buildString = note => {
  const index = tones.indexOf(note);
  const stringNotes = [];

  for (let i = 0; i < NUMBER_OF_NOTES; i++) {
    stringNotes.push(tones[(index + i) % NUMBER_OF_NOTES]);
  }

  return stringNotes;
};

const eString = buildString("E");
const bString = buildString("B");
const gString = buildString("G");
const dString = buildString("D");
const aString = buildString("A");

const guitarStrings = [eString, bString, gString, dString, aString, eString];

const ionian = [2, 2, 1, 2, 2, 2];
const dorian = [2, 1, 2, 2, 2, 2];
const phrygian = [1, 2, 2, 2, 1, 2];
const lydian = [2, 2, 2, 1, 2, 2];
const mixolydian = [2, 2, 1, 2, 2, 1];
const aeolian = [2, 1, 2, 2, 1, 2];
const locrian = [1, 2, 2, 1, 2, 2];

const scales = {
  ionian,
  dorian,
  phrygian,
  lydian,
  mixolydian,
  aeolian,
  locrian
};

export default {
  data: function() {
    return {
      tones,
      scalesOptions: Object.keys(scales),
      currentTone: "E",
      currentScale: "dorian"
    };
  },
  methods: {
    buildFret(index) {
      const fret = document.createElement("div");
      fret.className = "fret";
      fret.style.marginLeft = `${index * 64}px`;

      return fret;
    },
    buildDot(index) {
      const dot = document.createElement("div");
      dot.className = "dot";
      dot.style.marginLeft = `${index * 64 + 28}px`;

      return dot;
    },
    resetStrings() {
      const stringElements = document.getElementsByClassName("string");
      stringElements.forEach(element => {
        element.innerHTML = "";
      });
    },
    drawScale() {
      this.resetStrings();

      guitarStrings.forEach((string, stringIndex) => {
        let noteIndex = string.indexOf(this.currentTone);

        const drawDot = () => {
          const dot = this.buildDot(noteIndex);
          const stringElement = document.getElementsByClassName("string")[
            stringIndex
          ];
          stringElement.appendChild(dot);
        };

        scales[this.currentScale].forEach(interval => {
          drawDot();
          noteIndex = (noteIndex + interval) % NUMBER_OF_NOTES;
        });

        drawDot(); // draw last note
        drawDot(); // draw last note
      });
    }
  },
  watch: {
    currentTone: function() {
      this.drawScale();
    },
    currentScale: function() {
      this.drawScale();
    }
  },
  mounted: function() {
    for (let i = 0; i < NUMBER_OF_FRETS; i++) {
      const fret = this.buildFret(i);
      const container = document.getElementsByClassName("container")[0];
      container.appendChild(fret);
    }

    this.drawScale();
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

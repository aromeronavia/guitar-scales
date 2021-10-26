<template>
  <div>
    <div
      class="dot"
      :style="{
        marginLeft: `${(index * fretSize) + dotSize - fretSize}px`
      }"
      @mousedown="playNote"
      @mouseup="stopNote"
    />
    <span class="tooltip">
      {note.noteName}
    </span>
  </div>
</template>

<script>
export default {
  props: ['note', 'index'],
  data: function () {
    return {
      fretSize: 64,
      dotSize: 28
    }
  },
  methods: {
    playNote() {
      event.preventDefault();

      this.osc = this.audioContext.createOscillator();
      this.osc.connect(this.mainGainNode);
      this.osc.frequency.value = this.note.frequency;

      this.osc.start();
    },
    stopNote(event) {
      event.preventDefault();

      this.osc.stop();
    },
  },
  mounted: function () {
    this._osc = null;
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.mainGainNode = this.audioContext.createGain();
    this.mainGainNode.connect(this.audioContext.destination);
    this.mainGainNode.gain.value = 1.0;
  }
}
</script>

<style>
.dot {
  width: 16px;
  height: 16px;
  margin-top: -4px;
  border-radius: 100%;
  background-color: #0d1009;
  margin-left: 28px;
  position: absolute;
  cursor: pointer;
}

/* TODO: Choose a better color palette */
.dot--root {
  background-color: red;
}
.dot--secondNote {
  background-color: blue;
}
.dot--thirdNote {
  background-color: green;
}
.dot--fourthNote {
  background-color: yellow;
}
.dot--fifthNote {
  background-color: purple;
}
.dot--sixthNote {
  background-color: orange;
}

.tooltip {
  visibility: hidden;
  width: 30px;
  background-color: #7692ff;
  color: #fff;
  text-align: center;
  border-radius: 50px;
  padding: 5px 0;
  margin: 20px 20px;

  position: absolute;
  z-index: 1;
}

.dot:hover .tooltip {
  visibility: visible;
}
</style>

<template>
  <div
    class="fret"
    :style="{
      marginLeft: `${index * fretSize}px`,
      height: `${(stringTickness * numberOfStrings) + (stringSeparation * (numberOfStrings - 1))}px`
    }"
  >
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      required: true,
    },
    numberOfStrings: {
      type: Number,
      required: true,
    }
  },
  data: function () {
    return {
      fretSize: 64,
      stringTickness: 8,
      stringSeparation: 24,
    };
  }
}
</script>

<style>
.fret {
  position: absolute;
  border-radius: 4px;
  top: 0;
  width: 8px;
  background-color: #0d090a;
}
</style>

<template>
  <div
    class="string"
    :style="{ marginBottom: isLastString ? 0 : null }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    isLastString: {
      type: Boolean,
      required: true
    }
  },
}
</script>

<style>
.string {
  display: block;
  width: 776px;
  height: 5px;
  background-color: #c9ae5d;
  border-radius: 4px;
  margin-bottom: 28px;
  position: relative;
}
</style>

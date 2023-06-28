<template>
  <div class="container">
    <canvas ref="canvas" class="canvas" />
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import createAnimation from '@/lib/animation/index'; 

export default Vue.extend({
  mounted() {
    const interval = setInterval(() => {
      if ('createREGL' in globalThis) {
        clearInterval(interval);
        const canvasEl = this.$refs.canvas;
        createAnimation(canvasEl);
      }
    }, 100);
  },
});
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
}
</style>

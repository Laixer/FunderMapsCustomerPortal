<template>
  <div class="ProgressBar">
    <div class="Progress" :style="{ width: progress }"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ProgressBar extends Vue {
  /**
   * The current step
   */
  @Prop({ default: 0, required: true }) readonly step!: number;
  /**
   * The total number of steps
   */
  @Prop({ default: 0, required: true }) readonly steps!: number;

  /**
   * The progress in %, with a max of 100%
   */
  get progress(): string {
    return `${Math.min(100, (this.step / this.steps) * 100)}%`
  }
}
</script>


<style lang="scss">
.ProgressBar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: #d4daf0;
  z-index: 99999;

  @media only screen and (min-width: $BREAKPOINT) {
    position: relative;
  }

  .Progress {
    transition: width 0.3s;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: #00c95d;
  }
}
</style>
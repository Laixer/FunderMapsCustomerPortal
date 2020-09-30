<template>
  <aside class="ProgressSteps">
    <transition name="slide">
      <div v-if="!isDone" class="ProgressSteps__Indicator" :style="{ top: indicatorOffset }"></div>
    </transition>

    <transition-group name="list" tag="ul">
      <li v-for="step in steps" v-bind:key="step" :class="getClassFor(step)">
        <template v-if="step < currentStep">
          <span>
            <SvgIcon icon="icon_check" />
          </span>
        </template>
        <template v-else>
          <span>{{ step }}</span>
        </template>
      </li>
    </transition-group>
  </aside>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import SvgIcon from '@/components/common/SvgIcon.vue'

@Component({
  components: {
    SvgIcon
  }
})
export default class ProgressSteps extends Vue {
  /**
   * The progress # (step)
   */
  @Prop({ default: 0, required: true }) readonly currentStep!: number;
  /**
   * The total number of steps
   */
  @Prop({ default: 0, required: true }) readonly steps!: number;


  /**
   * The number of finished steps
   */
  get finishedSteps(): number {
    return Math.max(0, this.currentStep - 1)
  }

  private getClassFor(step: number): string {
    if (step < this.currentStep) {
      return "ProgressSteps__Finished"
    }

    if (step === this.currentStep) {
      return "ProgressSteps__Current"
    }

    return "ProgressSteps__Future"
  }

  /**
   * The top offset of the step indicator line, in px
   *  Each step takes up 64px. The parent element add 50px due to padding
   */
  get indicatorOffset(): string {
    return `${(this.finishedSteps * 64) + 50}px`
  }

  /**
   * The future steps (numbers)
   */
  get futureSteps(): number[] {
    return this.range((this.steps - Math.min(this.steps, this.currentStep)), this.currentStep + 1)
  }

  /**
   * When the current step is beyond the maximum steps we can take we're done.
   */
  get isDone(): boolean {
    return this.steps < this.currentStep
  }

  /**
   * Generate an array of numbers, with length of size and starting at startAt
   */
  range(size: number, startAt = 0): number[] {
    return [...Array(size).keys()].map(i => i + startAt);
  }
}
</script>


<style lang="scss">
.list-enter-active {
  transition: all 1s;
}
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
.ProgressSteps {
  position: relative;
  width: 80px;
  height: 100%;
  padding: 50px 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  ul {
    display: flex;
    flex-direction: column;
  }

  &__Current,
  &__Finished,
  &__Future {
    transition: color 0.3s;
    width: 24px;
    height: 24px;
    position: relative;
    margin-bottom: 40px;
    text-align: center;
    border-radius: 50%;
    user-select: none;

    &:after {
      content: "";
      position: absolute;
      bottom: -30px;
      left: 11.5px; // 50% of 24px - 1/2 * 1px
      height: 20px;
      width: 1px;
      background: #d4daf0;
    }

    &:last-child {
      margin-bottom: 0;

      &:after {
        display: none;
      }
    }
  }

  &__Current,
  &__Future,
  &__Finished {
    font-size: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  &__Current {
    background: #00c95d;
    color: white;
  }
  &__Finished {
    span {
      display: flex;
      align-content: center;
      justify-content: center;

      svg {
        width: 1em;
        height: 1em;
      }
    }
    background: $PRIMARY_COLOR;
    color: white;
  }
  &__Future {
    color: rgba(119, 128, 141, 0.5);
    border: 2px solid #d4daf0;
  }

  &__Indicator {
    transition: top 0.3s ease;
    position: absolute;
    left: 0;
    height: 24px;
    width: 2px;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    background: #00c95d;
  }
}
</style>
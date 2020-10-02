<template>
  <header class="Header">
    <div class="Header__Group">
      <img class="Header__Logo" :src="vendorLogo" alt="Logo" />
    </div>
    <div class="Header__Group">
      <img
        class="Header__Logo Header__Logo__Second"
        :src="kcafLogo"
        alt="Logo__Second"
      />
      <a href="https://www.kcaf.nl/funderingslabel/" target="_blank">
        Hulp nodig?
      </a>
    </div>
    <ProgressBar v-if="steps" :step="step" :steps="steps" />
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import vendor from '@/vendor'
import kcafLogo from '@/assets/Logo-KCAF.png'
import ProgressBar from '@/components/layout/ProgressBar.vue'

@Component({
  components: {
    ProgressBar
  }
})
export default class Page extends Vue {
  /**
   * The progress # (step)
   */
  @Prop({ default: 0 }) readonly step!: number;
  /**
   * The total number of steps
   */
  @Prop({ default: 0 }) readonly steps!: number;

  private vendorLogo = vendor.logo
  private kcafLogo = kcafLogo

}
</script>

<style lang="scss">
.Header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  transition: all 0.3s;
  position: fixed;
  top: 0;
  left: 0;
  height: 80px;
  width: 100%;
  border-bottom: 1px solid #d4daf0;
  background: white;
  z-index: 999999;

  align-items: center;
  user-select: none;

  &__Group {
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
    align-items: center;
    height: 64px;

    @media only screen and (min-width: $BREAKPOINT) {
      height: 80px;
      margin: auto 80px;
    }

    a {
      display: flex;
      align-items: center;
      color: #606976;
    }
  }

  &__Logo {
    margin: auto;
    max-height: 80px;
    max-height: 64px;

    @media only screen and (min-width: $BREAKPOINT) {
      max-height: 80px;
      margin: auto 40px;
    }
  }

  &__Logo__Second {
    display: none;
    @media only screen and (min-width: $BREAKPOINT) {
      display: initial;
    }
  }

  a {
    margin: auto;
  }

  @media only screen and (min-width: $BREAKPOINT) {
    position: sticky;
    top: 0;
    height: 115px;
  }

  @media only screen and (min-width: $BREAKPOINT) {
    .ProgressBar {
      display: none;
    }
  }
}
</style>
<template>
  <div
    class="RiskLabel"
    :style="{ background: this.risk.labelColor }"
    :class="{
      'RiskLabel--submit': isSubmit,
      'RiskLabel--wide': wide,
      'RiskLabel--ghost': ghost,
      'RiskLabel--line': line,
    }"
  >
    <div
      class="RiskLabel__Banner"
      :style="{ background: this.risk.labelColor }"
    >
      <div class="RiskLabel__Title">Funderingsrisico</div>
      <div
        class="RiskLabel__Label"
        :style="{ background: this.risk.labelColor }"
      >
        <span>{{ translateFoundationRisk(this.risk.foundationRisk) }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Address from '@/types/Address';
import AnalysisRisk from '@/types/AnalysisRisk';
import FoundationRisk, { translate } from '@/types/FoundationRisk';

@Component
export default class RiskLabel extends Vue {
  @Prop({ required: true }) readonly risk!: AnalysisRisk;

  /**
 * A ghost button has no fill or border
 */
  @Prop({ default: false }) readonly isSubmit!: boolean;
  /**
   * A ghost button has no fill or border
   */
  @Prop({ default: false }) readonly ghost!: boolean;
  /**
   * A line button only shows a border in normal view. Fill shows in states
   */
  @Prop({ default: false }) readonly line!: boolean;
  /**
   * The button takes up full width if true
   */
  @Prop({ default: false }) readonly wide!: boolean;

  private translateFoundationRisk(input: FoundationRisk) {
    return translate(input)
  }
}
</script>

<style lang="scss">
$active: adjust-color($PRIMARY_COLOR, $red: 120, $green: 91, $blue: 0);
$hover: adjust-color($PRIMARY_COLOR, $red: -7, $green: -19, $blue: -58);

.RiskLabel {
  width: 250px;
  margin-bottom: 15px;
  position: relative;
  padding: 15px 27px 16px;
  border-radius: 4px;
  user-select: none;
  color: white;

  &__Banner {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
  }

  &__Title {
    font-size: 18px;
    line-height: 1.25;
    padding: 0;
    margin: 0;
    font-weight: bold;
  }

  &__Label {
    position: absolute;
    right: -20px;
    font-size: 40px;
    font-weight: bold;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    user-select: none;

    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .SvgIcon {
    font-size: 14px;

    &:last-child {
      margin-left: 15px;
    }
    &:first-child {
      margin-right: 15px;
    }
  }
}
</style>
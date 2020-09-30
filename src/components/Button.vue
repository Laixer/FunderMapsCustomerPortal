<template>
  <div
    class="Button"
    :class="{ 'Button--submit': isSubmit, 'Button--wide': wide, 'Button--ghost': ghost, 'Button--line': line }"
    @click="handleClick"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Button extends Vue {

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

  /**
   * Pass on the click event
   */
  handleClick(e: Event) {
    this.$emit('click', e)
  }
}
</script>

<style lang="scss">
$active: adjust-color($PRIMARY_COLOR, $red: 120, $green: 91, $blue: 0);
$hover: adjust-color($PRIMARY_COLOR, $red: -7, $green: -19, $blue: -58);

.Button {
  position: relative;
  padding: 15px 27px 16px;
  font-size: 18px;
  line-height: 19px;
  letter-spacing: -0.3px;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
  display: inline-flex;
  align-items: center;

  // Regular
  background: $PRIMARY_COLOR;
  color: white;

  &--submit {
    background: #00c95d;
  }

  &:hover {
    background: $hover;
  }

  &:active {
    background: $active;
  }
  &[disabled] {
    opacity: 0.25;
    filter: grayscale(80%);
    cursor: not-allowed;
  }

  &--line {
    background: white;
    color: $PRIMARY_COLOR;
    padding: 13px 25px 14px;
    border: 2px solid $PRIMARY_COLOR;

    &:hover {
      background: $PRIMARY_COLOR;
      color: white;
      border: none;
      padding: 15px 27px 16px;
    }
    &:active {
      background: $active;
      color: white;
      border: none;
      padding: 15px 27px 16px;
    }
    &[disabled] {
      filter: grayscale(80%);
      color: white;
      border: none;
      padding: 15px 27px 16px;
    }
  }

  &--ghost {
    background: transparent;
    color: $PRIMARY_COLOR;
    filter: grayscale(80%);
    opacity: 0.8;

    &:hover {
      background: transparent;
      filter: none;
      opacity: 1;

      color: $PRIMARY_COLOR;
    }
    &:active {
      background: transparent;
      filter: none;
      opacity: 1;
      color: $active;
    }
  }

  &--wide {
    text-align: center;
    width: 100%;
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
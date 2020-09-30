<template>
  <p
    class="BodyText"
    :class="{ 'BodyText--center': center, 'BodyText--bold': bold }"
  >
    <slot>{{ text }}</slot>
  </p>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class BodyText extends Vue {
  /**
   * The text
   */
  @Prop({ default: '' }) readonly text!: string;
  /**
   * Whether to center the text
   */
  @Prop({ default: false }) readonly center!: boolean;

  /**
   * Whether to make the text bold
   */
  @Prop({ default: false }) readonly bold!: boolean;

}
</script>


<style lang="scss">
.BodyText {
  color: #606976;
  font-size: 18px;
  line-height: 26px;
  margin: 0;
  padding: 0;

  max-width: 550px;

  &--center {
    text-align: center;
  }
  &--bold {
    font-weight: bold;
  }
}
</style>
<template>
  <div class="Title" :class="{ 'Title--center': center }">
    <h1><slot>{{ title }}</slot></h1>
    <slot name="subtitle">
      <p v-if="subtitle">{{ subtitle }}</p>
    </slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Title extends Vue {
  /**
   * The title / label text
   */
  @Prop({ default: '' }) readonly title!: string;
  /**
   * Some titles have subtitles / instructions
   */
  @Prop({ default: '' }) readonly subtitle!: string;
  /**
   * Whether to center the text
   */
  @Prop({ default: false }) readonly center!: boolean;
}
</script>


<style lang="scss">

.Title {
  color: #202122;
  
  h1 {
    font-size: 24px;
    line-height: 1.25;
    padding: 0;
    margin: 0;
    font-weight: bold;
  }

  &--center {
    text-align: center;
  }
  p {
    margin: 0;
    padding: 0;
    font-size: 14px;
    line-height: 32px;
  }
}

</style>
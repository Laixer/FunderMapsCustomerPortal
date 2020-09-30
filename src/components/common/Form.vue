<template>
  <form
    class="Form"
    @submit.prevent="handleSubmit"
    :autocomplete="autocomplete ? 'on' : 'off'"
    novalidate
  >
    <slot />

    <!-- Required to allow the form to be submitted programmatically -->
    <button ref="btn" style="display: none" type="submit" />
  </form>
</template>

<script lang="ts">
import { Component, Prop, Provide, Watch, Vue } from 'vue-property-decorator';

import { IConnectedField } from './IConnectedField'

@Component
export default class Form extends Vue {
  $refs!: {
    btn: HTMLElement;
  }

  /**
   * Provide a method for child form fields to connect themselves to this form component
   */
  @Provide() registerFormField = this.registerFormFieldInternal

  /**
   * Whether the form is busy - meaning the fields are disabled
   */
  @Prop({ default: false }) readonly busy!: boolean;

  /**
   *  Disables the browser's auto complete function
   */
  @Prop({ default: false }) readonly autocomplete!: boolean;

  /**
   * The list of registered (connected) form fields. Fields contained withing the form are automatically connected
   */
  private fields: Array<IConnectedField> = []

  /**
   * Keep track of the busy state of the form. Disabled / enable all fields accordingly
   */
  @Watch('busy')
  busyChanged(): void {
    this.fields.forEach(field => {
      this.busy ? field.disable() : field.enable()
    })
  }

  /**
   * All fields contained in this form should register themselves in order 
   * to be processed by the mechanism provided by this component.
   * 
   * Note: every field should have a `validate`, `isValid`, `disable`, `enable` & `resetValidation` method.
   */
  registerFormFieldInternal({ validate, isValid, resetValidation, disable, enable }: IConnectedField): void {
    this.fields.push({ validate, isValid, resetValidation, disable, enable })
  }

  /**
   * Run the validation on every registered field
   */
  validate(): void {
    this.fields.forEach(field => {
      field.validate()
    })
  }

  /**
   * Are all registered fields valid?
   */
  isValid(): boolean {
    return this.fields.every(field => {
      return field.isValid
    })
  }

  /**
   * Reset the validation mechanism
   */
  resetValidation(): void {
    this.fields.forEach(field => {
      field.resetValidation()
    })
  }

  /**
   * Allow the form to be submitted programmatically
   */
  submit(): void {
    // Note: 
    //  Why not ref the form itself and use submit() on the form DOM element?
    //  Because then the submit event handler bound by vue is not triggered...
    this.$refs.btn.click()
  }

  /**
   * Capture the submit event, handle validation, and then either pass on 
   * the event on success, or trigger an error event instead.
   */
  handleSubmit(e: Event): void {
    if (this.busy) {
      return
    }

    this.validate()

    this.$nextTick(() => {
      if (this.isValid()) {
        this.$emit('submit', e)
      } else {
        this.$emit('error', e)
      }
    })

  }
}
</script>

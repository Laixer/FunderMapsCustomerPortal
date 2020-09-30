<template>
  <div class="FormField" :class="fieldClasses">
    <label :for="id" class="FormField__Label">{{ label }}</label>

    <div class="FormField__Wrapper">
      <textarea
        v-if="type === 'textarea'"
        :id="id"
        :value="fieldValue"
        :type="type"
        :placeholder="placeholder"
        :autocomplete="autocomplete ? autocomplete : 'off'"
        :disabled="isDisabled"
        :rows="rows"
        class="FormField__Field"
        @input="handleInput"
        @blur="handleBlur"
      />
      <input
        v-else
        :id="id"
        :value="fieldValue"
        :type="type"
        :pattern="pattern"
        :placeholder="placeholder"
        :autocomplete="autocomplete ? autocomplete : 'off'"
        :disabled="isDisabled"
        class="FormField__Field"
        @input="handleInput"
        @blur="handleBlur"
      />

      <SvgIcon
        v-if="validationIcon"
        :icon="validationIcon"
        class="FormField__Icon"
      />
    </div>

    <span v-if="error" class="FormField__Feedback">{{ error }}</span>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Inject, Watch, Vue } from 'vue-property-decorator';
import SvgIcon from '@/components/common/SvgIcon.vue'

import { IConnectedField } from './IConnectedField'
import { IOption } from './IOption'

@Component({
  components: {
    SvgIcon
  }
})
export default class FormField extends Vue {

  @Inject() registerFormField!: (field: IConnectedField) => void;

  /**
   * The type of form field
   */
  @Prop({ default: 'text' }) readonly type!: string;

  @Prop({ default: '' }) readonly pattern!: string;

  /**
   * The field id
   */
  @Prop({ default: '', required: true }) readonly id!: string;

  /**
   * The input label
   */
  @Prop({ default: '' }) readonly label!: string;

  /**
   * The field value
   */
  @Prop({ default: '' }) readonly value!: string | boolean | number | Array<string>;

  /**
   * The placeholder value
   */
  @Prop({ default: '' }) readonly placeholder!: string;


  /******************************************
   * Field validation
   */

  /**
   * The validation state. Starts out as null
   */
  @Prop({ default: null }) readonly valid!: boolean | null;

  /**
   * The error message
   */
  @Prop({ default: '' }) readonly error!: string;

  /**
   * Disables the validation process
   */
  @Prop({ default: false }) readonly novalidate!: boolean;


  /******************************************
   * Type specific props
   */

  /**
   * The textarea rows attribute
   */
  @Prop({ default: 3 }) readonly rows!: number;

  /**
   * The options list for select, radio & checkbox lists
   */
  @Prop({ default: () => [] }) readonly options!: Array<IOption>;

  /**
   * The select type can support one or multiple answers
   */
  @Prop({ default: false }) readonly multiple!: boolean;

  /******************************************
   * State props
   */

  /**
   * Whether the field is disabled
   */
  @Prop({ default: false }) readonly disabled!: boolean;

  /**
   * Disables the browser's auto complete function
   */
  @Prop({ default: false }) readonly autocomplete!: boolean | string;



  /******************************************
   * Data
   */

  /**
   * Whether the field is disabled because it is busy
   */
  private busy = false;

  /**
   * Indicates whether the user has interacted with this field.
   */
  protected hasBeenInteractedWith = false;

  /**
   * The bound field value
   */
  protected fieldValue: string | boolean | number | Array<string | boolean | number> = ''


  /******************************************
   * Computed
   */

  /**
   * The disabled state can be set on field level as a prop, and can be determined by the busy state of the form
   */
  get isDisabled(): boolean {
    return this.disabled || this.busy
  }

  /**
   * Provide read access to the busy property
   */
  get isBusy(): boolean {
    return this.busy
  }

  /**
   * Whether the field has been validated positively
   *  Returns null if validation has not been applied yet
   */
  get isValid(): boolean {
    if (this.novalidate) { // = validation is disabled
      return false
    }
    return !!this.valid
  }

  /**
   * Whether the validation has been applied.
   *  We cannot know for certain about this. The interaction indicator that triggers the 
   *  first validation is taken as validation indicator
   */
  get hasBeenValidated(): boolean {
    return this.hasBeenInteractedWith && !this.novalidate
  }

  /**
   * Returns the icon name based on the validation status
   *  Returns false if validation hasn't occurred yet
   */
  get validationIcon(): string | false {
    if (this.hasBeenValidated) {
      return this.isValid ? 'icon_check' : 'icon_error'
    }

    return false
  }

  /**
   * List of css classes
   */
  get fieldClasses(): Record<string, boolean> {
    return {
      'FormField--disabled': this.isDisabled,
      'FormField--busy': this.isBusy,
      'FormField--valid': this.hasBeenValidated ? this.isValid : false,
      'FormField--invalid': this.hasBeenValidated ? !this.isValid : false
    }
    // TODO: Avoid TypeScript 'any' error
    // const type = `FormField--${this.type}`
    // classes[`FormField--${this.type}`] = true
    // return classes
  }

  /**
   * The checkbox type automatically supports multiple values, the select by default does not
   */
  get supportsMultiple(): boolean {
    return this.type === 'checkbox' || (this.type === 'select' && this.multiple)
  }

  /******************************************
   * Watchers
   */
  @Watch('value')
  valueChanged(newValue: string | boolean | number | Array<string>) {
    if (!Array.isArray(newValue) && this.supportsMultiple) {
      this.fieldValue = newValue === '' ? [] : [newValue]
    } else {
      this.fieldValue = newValue
    }
  }


  /******************************************
   * Lifecycle Hooks
   */

  created() {
    if (!Array.isArray(this.value) && this.supportsMultiple) {
      this.fieldValue = this.value === '' ? [] : [this.value]
    } else {
      this.fieldValue = this.value
    }
    // If contained within a Form component, register the form field
    if (this.registerFormField) {
      const field: IConnectedField = {
        enable: this.enable,
        disable: this.disable,
        validate: this.validate,
        isValid: this.isValid,
        resetValidation: this.resetValidation
      }
      this.registerFormField(field);
    }
  }

  /******************************************
   * Methods
   */

  /**
   * Validation starts after the initial blur (first user interaction)
   */
  handleBlur() {
    if (this.hasBeenInteractedWith === false) {
      this.validate();
    }
    this.hasBeenInteractedWith = true;
  }

  /**
   * Handle input changes
   */
  handleInput(e: Event) {

    const target = e.target as HTMLInputElement

    if (this.supportsMultiple) {

      if (Array.isArray(this.fieldValue)) {
        const index = this.fieldValue.indexOf(target.value)
        if (index > -1) {
          this.fieldValue.splice(index, 1)
        } else {
          this.fieldValue.push(target.value)
        }
      } else {
        this.fieldValue = [target.value]
      }

    } else {
      this.fieldValue = target.value
    }

    if (this.hasBeenInteractedWith || this.type === 'select' || this.type === 'radio' || this.type === 'checkbox') {
      this.validate()
    }
    this.$emit('input', this.fieldValue)
  }

  /**
   * The actual field validation is externalised. 
   */
  validate(): void {
    if (!this.novalidate) {
      this.$emit('validate', this.fieldValue)
    }
  }

  /**
   * This resets the validation trigger mechanism.
   *  Because the validation process itself is external, it does not reset state
   */
  resetValidation() {
    this.hasBeenInteractedWith = false
  }

  /**
   * Enabe / disable the busy state
   */
  enable() {
    this.busy = false
  }
  disable() {
    this.busy = true
  }

}
</script>

<style lang="scss">
$disabled: adjust-color(
  $PRIMARY_COLOR,
  $red: 81,
  $green: 41,
  $blue: -114,
  $alpha: -0.7
);

.FormField {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  &__Label {
    font-size: 18px;
    line-height: 21px;
    letter-spacing: -0.3px;
    color: #606976;
    margin-bottom: 9px;
  }

  &__Field {
    width: 100%;
    flex: 2;
    color: #202122;
    border-radius: 4px;
    border: 2px solid #d4daf0;
    background: white;
    font-size: 16px;
    line-height: 19px;
    outline: none;
    padding: 13px 15px 14px;
    transition: border-color 0.2s ease-in-out;

    &::placeholder {
      color: #606976;
    }

    &:focus {
      border-color: $PRIMARY_COLOR;
    }
  }

  &__Wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    @media only screen and (min-width: $BREAKPOINT) {
      flex-direction: column;
    }
  }

  &__Icon {
    top: 35px;
    flex: 0 1 10%;
    position: absolute;
    width: 30px;
    height: 40px;
    right: 5px;
    font-size: 12px;
    opacity: 0;
    margin: 0 5px;
    transition: opacity 0.2s ease-in-out;

    svg {
      display: block;
      margin: auto;
    }
  }

  &--valid &__Field {
    border-color: #00c95d;
    padding-right: 45px;
  }
  &--invalid &__Field {
    border-color: #ff3b30;
    padding-right: 45px;
  }
  &--valid &__Icon,
  &--invalid &__Icon {
    color: #00c95d;
    opacity: 1;
  }
  &--invalid &__Icon {
    color: #ff3b30;
  }
  &--disabled &__Field {
    background: rgba(119, 128, 141, 0.2);
    cursor: not-allowed;
  }
}
</style>
<template>
  <div class="FormField GeoCoder" :class="fieldClasses">
    <label :for="id" class="FormField__Label">{{ label }}</label>

    <div class="FormField__Wrapper">
      <input
        :id="id"
        :value="fieldValue"
        :type="type"
        :placeholder="placeholder"
        :autocomplete="autocomplete ? autocomplete : 'off'"
        :disabled="isDisabled"
        class="FormField__Field"
        @input="handleInput"
        @blur="handleBlur"
      />

      <SvgIcon :icon="fieldIcon" class="FormField__Icon" />

      <div v-if="suggestions.length !== 0" class="GeoCoder__Suggestions">
        <div
          class="Suggestion"
          v-for="address in suggestions"
          :key="address.id"
          @click="handleSelect(address)"
        >
          <SvgIcon icon="icon_location" class="Suggestion__Icon" />
          <span v-html="format(address)"></span>
        </div>
      </div>
    </div>

    <span v-if="error" class="FormField__Feedback">{{ error }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { Debounce } from 'vue-debounce-decorator'

import FormField from '@/components/common/FormField.vue'

import Address from '@/types/Address'

@Component
export default class GeoCoder extends FormField {
  private suggestions: Array<Address> = []

  @Prop({ default: null }) readonly address!: Address | null;

  get fieldIcon(): string {
    return this.validationIcon ? this.validationIcon : 'icon_search'
  }

  created(): void {
    if (this.address) {
      this.fieldValue = this.address.label
    }
  }

  /**
   * Handle input changes
   */
  @Debounce(200)
  async handleInput(e: Event): Promise<void> {
    const target = e.target as HTMLInputElement

    // We only want to send an API call if the length of the input is at least 3.
    if (target.value.length >= 3) {
      try {

        // Request addresses from API
        const json = await fetch(`${process.env.VUE_APP_API_BASE_URL}/api/incident-portal/address-suggest?query=${target.value}&limit=5`)
          .then(res => {
            if (!res.ok) throw new Error(res.statusText)
            return res.json()
          })

        this.suggestions = []

        // Populate address collection with parsed TypeScript classes
        json.forEach((item: any) => {
          this.suggestions.push(
            // Parsing JSON to a class like thisis not very pretty 
            // but it will have to do until we find a better alternative
            new Address(
              item.addressId,
              item.buildingGeometry,
              item.buildingId,
              item.buildingNumber,
              item.builtYear,
              item.postalCode,
              item.street,
              item.city
            ))

        })
      } catch (e) {
        // If the response fails, clear the collection
        this.suggestions = []
      }
    }

    // Update our fieldValue so the form input box updates
    this.fieldValue = target.value

    // We are in search mode. Emit a null value until we select something with [handleSelect]
    this.$emit('address', null)
  }

  /**
   * Handle selection events
   */
  private handleSelect(address: Address): void {
    this.suggestions = []
    this.fieldValue = address.label
    this.$emit('address', address)
  }

  /**
   * Format our address suggestions
   * 
   * We use a specific function that includes 
   * HTML markup so we can use highlighting.
   */
  private format(address: Address): string {
    return address.labelWithMarkup(this.fieldValue as string)
  }
}
</script>

<style lang="scss">
.GeoCoder {
  position: relative;

  .FormField__Field {
    padding-right: 45px;
  }

  .FormField__Icon {
    opacity: 1;
    font-size: 20px;
  }
}
.GeoCoder.FormField--invalid,
.GeoCoder.FormField--valid {
  .FormField__Icon {
    font-size: 12px;
  }
}

.GeoCoder__Suggestions {
  width: 100%;
  padding-top: 5px;
  border: 2px solid #d4daf0;
  border-top: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow: hidden;
  background: white;

  @media only screen and (max-width: $BREAKPOINT) {
    position: absolute;
    top: 80px;
    z-index: 9999;
  }

  .Suggestion {
    display: block;
    position: relative;
    padding: 13px 15px 14px 50px;
    width: 100%;

    span {
      font-size: 14px;
      line-height: 19px;
      color: #202122;
    }

    .SvgIcon {
      color: #d4daf0;
      position: absolute;
      top: 13px;
      left: 20px;
      font-size: 19px;
    }

    &:hover {
      cursor: pointer;
      background: $PRIMARY_COLOR;

      .SvgIcon,
      span {
        color: white;
      }
    }
  }
}
</style>
<template>
  <div class="Profile__Wrapper">
    <Title :center="true">Uw gegevens</Title>

    <Form :busy="busy">
      <div class="Form__Row">
        <FormField
          :value="this.firstName"
          label="Voornaam"
          id="voornaam"
          autocomplete="given-name"
          :valid="firstnameValid"
          @input="updateFirstname"
        />
        <FormField
          :value="this.lastName"
          label="Achternaam"
          id="achternaam"
          autocomplete="family-name"
          :valid="lastnameValid"
          @input="updateLastname"
        />
      </div>
      <FormField
        :value="this.email"
        label="E-mail"
        id="email"
        type="email"
        autocomplete="email"
        :valid="emailValid"
        @input="updateEmail"
      />
    </Form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator'
import QuestionMixin from '@/components/questions/Question'

import Page from '@/components/layout/Page.vue'
import Title from '@/components/Title.vue'
import Button from '@/components/Button.vue'
import SvgIcon from '@/components/common/SvgIcon.vue'

import Form from '@/components/common/Form.vue'
import FormField from '@/components/common/FormField.vue'
import TextArea from '@/components/form/TextArea.vue'

import * as EmailValidator from 'email-validator';

@Component({
  mixins: [QuestionMixin],
  components: {
    Page, Button, Title, SvgIcon,
    Form, FormField, TextArea
  }
})

export default class ProfileQuestion extends Mixins(QuestionMixin) {
  private firstName: string | null = null
  private lastName: string | null = null
  private email: string | null = null

  private get firstnameValid(): boolean | null {
    return this.firstName !== null
      && this.firstName.length < 255
      && this.firstName.length > 0
  }

  private get lastnameValid(): boolean {
    return this.lastName !== null
      && this.lastName.length < 255
      && this.lastName.length > 0
  }

  private get emailValid(): boolean {
    return this.email !== null
      && this.email.length < 255
      && this.email.length > 0
      && EmailValidator.validate(this.email)
  }

  public get isValid(): boolean {
    return !!this.emailValid && !!this.lastnameValid && !!this.firstnameValid
  }

  /**
   * Load the previously stored profile data from the store
   */
  created(): void {
    this.firstName = this.$store.state.firstName
    this.lastName = this.$store.state.lastName
    this.email = this.$store.state.email
  }

  public storeData(): void {
    this.$store.commit('updateState', [
      {
        key: 'firstName',
        value: this.firstName
      },
      {
        key: 'lastName',
        value: this.lastName
      },
      {
        key: 'email',
        value: this.email
      }
    ])
  }

  private updateFirstname(value: string): void {
    this.firstName = value
  }

  private updateLastname(value: string): void {
    this.lastName = value
  }

  private updateEmail(value: string): void {
    this.email = value
  }
}
</script>


<style lang="scss">
.Profile {
  &__Wrapper {
    padding: 20px 20px;

    @media only screen and (min-width: $BREAKPOINT) {
      padding: 20px 80px;
    }
    max-width: 550px;
    width: 100%;
    margin: 0 auto;
  }
  .Title {
    margin-bottom: 26px;
  }

  @media only screen and (min-width: $BREAKPOINT) {
    .Form__Row {
      display: flex;
      justify-content: space-between;

      .FormField {
        width: calc(50% - 10px);
      }
    }
  }
}
</style>
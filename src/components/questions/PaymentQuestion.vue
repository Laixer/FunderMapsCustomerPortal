<template>
  <div class="Payment__Wrapper">
    <Title :center="true">Kies uw betaalmethode</Title>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator'
import QuestionMixin from '@/components/questions/Question'

import Page from '@/components/layout/Page.vue'
import Title from '@/components/Title.vue'
import Button from '@/components/Button.vue'
import SvgIcon from '@/components/common/SvgIcon.vue'

import TextArea from '@/components/form/TextArea.vue'


@Component({
  mixins: [QuestionMixin],
  components: {
    Page, Button, Title, SvgIcon, TextArea
  }
})

export default class PaymentQuestion extends Mixins(QuestionMixin) {
  public get isValid(): boolean {
    return true
  }

  public storeData(): void {
    return
  }
}
</script>


<style lang="scss">
.Payment {
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
}
</style>
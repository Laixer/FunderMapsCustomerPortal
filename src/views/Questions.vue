<template>
  <Page :step="this.currentStep" :steps="this.totalSteps" class="Questions">
    <transition name="slide" mode="out-in" appear>
      <component
        ref="currentQuestionComponent"
        :is="getComponent"
        :busy="busy"
        @isValid="isValid"
      />
    </transition>

    <template slot="footer">
      <Button
        :ghost="true"
        v-if="this.currentStep > 1 && !this.isFinal"
        @click="handleNavigate(-1)"
      >
        <SvgIcon icon="icon_arrow_previous" />
        <span>Vorige</span>
      </Button>
      <template v-if="!this.isLastStep && !this.isFinal">
        <Button :disabled="!this.valid" @click="handleNavigate(1)">
          <span>Volgende</span>
          <SvgIcon icon="icon_arrow_next" />
        </Button>
      </template>
      <template v-else-if="!this.isFinal">
        <Button
          :isSubmit="true"
          :disabled="!this.valid"
          @click="handleNavigate(1)"
        >
          <span>Bekijk funderingsrisico</span>
          <SvgIcon icon="icon_check" />
        </Button>
      </template>
      <template v-else>
        <span>
          <a
            id="changeLabel"
            href="https://www.kcaf.nl/funderingslabel/"
            target="_blank"
          >
            Label wijzigen?
          </a>
        </span>
      </template>
    </template>
  </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import Page from '@/components/layout/Page.vue'
import Button from '@/components/Button.vue'
import SvgIcon from '@/components/common/SvgIcon.vue'

import ProfileQuestion from '@/components/questions/ProfileQuestion.vue'
import AddressQuestion from '@/components/questions/AddressQuestion.vue'
// import PaymentQuestion from '@/components/questions/PaymentQuestion.vue'
import QuestionMixin from '@/components/questions/Question'
import ResultPage from '@/components/questions/ResultPage.vue'

@Component({
  components: {
    Page, Button, SvgIcon,
    AddressQuestion, ProfileQuestion, ResultPage
  }
})
export default class Questions extends Vue {
  private questions: { [key: number]: typeof QuestionMixin } = {
    1: AddressQuestion,
    2: ProfileQuestion,
    // 3: PaymentQuestion,
  }

  private finalComponent = ResultPage

  private valid = false

  /**
   * Retrieve validation state of current question component
   */
  private isValid(validity: boolean): void {
    this.valid = validity
  }

  /**
   * Indicates the form is being submitted
   */
  private busy = false


  private currentStep = 1;

  /**
   * The current step is based on the question number from the route
   */
  // get currentStep(): number {
  //   return parseInt(this.$route.params.question, 10)
  // }
  private get nextButtonText() {
    return this.isLastStep ? "Versturen" : "Volgende"
  }

  private get isLastStep(): boolean {
    return this.currentStep === this.totalSteps
  }

  private get isFinal(): boolean {
    return this.currentStep === this.totalSteps + 1
  }

  /**
   * The question component is a reference to the currently loaded dynamic component, 
   * which in turn is loaded based on the question index from the route
   */
  private currentQuestionComponent(): QuestionMixin {
    return this.$refs.currentQuestionComponent as QuestionMixin
  }

  get totalSteps(): number {
    return Object.keys(this.questions).length
  }

  get getComponent(): any {
    if (this.isFinal) {
      return this.finalComponent
    }
    return this.questions[this.currentStep]
  }

  /**
   * Handle navigation 
   */
  private async handleNavigate(direction: number): Promise<void> {
    if (direction > 0 && !this.currentQuestionComponent().isValid) return

    if (this.currentQuestionComponent) {
      try {
        this.currentQuestionComponent().storeData()
      } catch (e) {
        console.error(`Error storing form data: ${e.message}`)
      }
    }

    this.valid = false
    this.currentStep += direction
  }

}
</script>

<style lang="scss">
#changeLabel {
  display: flex;
  align-items: center;
  color: #606976;
}
.slide-enter-active {
  transition: all 0.3s ease;
}
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter {
  transform: translateX(-10px);
  opacity: 0;
}
.slide-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
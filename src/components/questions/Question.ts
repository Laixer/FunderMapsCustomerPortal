/* eslint-disable @typescript-eslint/ban-ts-comment */

// note two things:
// 1) this is not the actually exported class, even though it contains all logic (If we'd export and use this as the actual mixin, nothing would work, since I guess abstract classes are only compile time and not runtime in TS?)
// 2) the @ts-ignore comment, which makes the @Component decorator stop complaining about the fact that it does not like abstract classes
//
// reference: https://github.com/vuejs/vue-class-component/issues/91#issuecomment-451422547


import { Component, Vue } from 'vue-property-decorator'

// @ts-ignore
@Component
abstract class QuestionAbstract extends Vue {
  protected busy = false;

  created(): void {
    this.$emit('isValid', this.isValid)
  }

  mounted(): void {
    this.$emit('isValid', this.isValid)
  }

  updated(): void {
    this.$emit('isValid', this.isValid)
  }

  public abstract get isValid(): boolean;
  public abstract storeData(): void;
}

@Component
// @ts-ignore
export default class QuestionMixin extends QuestionAbstract { }
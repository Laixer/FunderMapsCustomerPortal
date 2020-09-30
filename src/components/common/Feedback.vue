<template>
  <div 
    v-if="show" 
    class="Feedback"
    :class="classList"
    role="alert">

    <SvgIcon class="Feedback__Icon" v-if="icon" :icon="icon" />
    <span>{{ message }}</span>

    <button type="button" class="Feedback__Close" aria-label="Close" @click="hideFeedback">
      <span aria-hidden="true">
        <SvgIcon icon="icon_error" />
      </span>
    </button>
  </div>
</template>

<script>
import SvgIcon from '@/components/common/SvgIcon.vue'

/**
 * Based on https://getbootstrap.com/docs/4.0/components/alerts/#dismissing
 */
export default {
  components: { SvgIcon },
  props: {
    // This input is processed by `processFeedback`
    feedback: {
      type: Object,
      required: true
    }
  },
  data() {
    // The processed data, which is bound to the template
    return {
      show: false,
      variant: 'info',
      message: '',
      fade: false
    }
  },
  computed: {
    icon() {
      switch(this.variant) {
        case 'info':
          return 'icon_info';
        case 'error':
        case 'warning':
        case 'danger':
          return 'icon_warning';
        case 'success':
          return 'icon_check_circle'
      }
      return ''
    },
    classList() {
      const classes = { 
        'Feedback--has-icon': this.icon !== '',
        'Feedback--fade': this.fade
      }
      const variant = `Feedback--${this.variant}`
      classes[variant] = true
      return classes
    }
  },
  watch: {
    /**
     * When the feedback prop is updated, the input object is evaluated 
     * and the bound data updated accordingly.
     */
    feedback(feedback) {
      this.processFeedback(feedback)
    }
  },
  created() {
    this.processFeedback(this.feedback)
  },
  methods: {
    
    /**
     * Set the bound values based on the feedback input
     */
    processFeedback(feedback) {
      if (feedback.variant) {
        this.variant = feedback.variant
      }
      if (feedback.message) {
        this.message = feedback.message
      }
      // If the message or variant is changed, we assume it should be visible
      if (feedback.variant || feedback.message) {
        this.show = true;
      }
      // The above assumption can be overwritten by explicitly passing a value
      if (feedback.show) {
        this.show = feedback.show
      }
    },
    /**
     * These two methods allow programmatic access through a `ref` binding
     */
    hideFeedback() {
      if (this.fade !== true) {
        setTimeout(() => {
          this.show = false
        }, 150)
      }
      this.fade = true
    },
    showFeedback({ variant, message }) {
      this.variant = variant
      this.message = message
      this.fadde = false
      this.show = true
    }
  }
}
</script>

<style lang="scss">
/** 
 * Based on 
 */
.Feedback {
  position: relative;
  padding: .75rem 4rem .75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: .25rem;

  opacity: 1;
  transition: opacity .15s linear;

  &--fade {
    opacity: 0;
  }

  &--has-icon {
    padding-left: 4rem;
  }

  &--danger {
    color: #856404;
    background-color: #fff3cd;
    border-color: #ffeeba;
  }
  &--success {
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
  }
  &--info {
    color: #0c5460;
    background-color: #d1ecf1;
    border-color: #bee5eb;
  }

  &__Icon {
    position: absolute;
    top: 0;
    left: 0;
    padding: .75rem 1.25rem;
  }

  &__Close {
    float: right;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    opacity: .5;
    
    background-color: transparent;
    border: 0;
    -webkit-appearance: none;

    position: absolute;
    top: 0;
    right: 0;
    padding: .75rem 1.25rem;
    color: inherit;

    cursor: pointer;
  }
}
</style>
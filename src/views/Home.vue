<template>
  <Page class="Home">
    <div class="Home__Wrapper">
      <div class="Home--left">

        <div class="alert alert-warning" role="alert">
          Momenteel is het erg druk, probeer het later opnieuw.
        </div>

        <Title>
          <span v-html="vendor.home.title" />
        </Title>
        <BodyText :bold="true">
          <span v-html="vendor.home.subtitle" />
        </BodyText>
        <BodyText>
          <span v-html="vendor.home.content" />
        </BodyText>
        <div>
          <Button 
            id="navigateBodyButton" 
            @click="handleNavigate">
            <span>Bekijk funderingsrisico</span>
            <SvgIcon icon="icon_arrow_next" />
          </Button>
        </div>
      </div>
      <div class="Home--right">
        <img :src="vendor.home.image" width="640" height="585" alt="Logo" />
      </div>
    </div>

    <template slot="footer">
      <Copyright />
      <Button id="navigateFooterButton" @click="handleNavigate">
        <span>Bekijk funderingsrisico</span>
        <SvgIcon icon="icon_arrow_next" />
      </Button>
    </template>
  </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import Page from '@/components/layout/Page.vue'
import Title from '@/components/Title.vue'
import BodyText from '@/components/BodyText.vue'
import Copyright from '@/components/Copyright.vue'
import Button from '@/components/Button.vue'
import SvgIcon from '@/components/common/SvgIcon.vue'
import vendor from '@/vendor'

@Component({
  components: {
    Page, Button, SvgIcon, Copyright, Title, BodyText
  }
})
export default class Home extends Vue {
  handleNavigate(): void {
    this.$router.push({
      name: 'Questions',
      params: {
        question: '1',
      }
    })
  }

  private vendor = vendor
}
</script>

<style lang="scss">
.Home {
  &__Wrapper {
    padding: 20px 20px;

    @media only screen and (min-width: $BREAKPOINT) {
      padding: 50px 80px;
    }
    display: flex;
    max-width: 100%;
    justify-content: space-between;
    flex-direction: column;

    @media only screen and (min-width: $BREAKPOINT) {
      flex-direction: row;

      &--right {
        display: none;
      }
    }
  }
  &--left {
    .Title,
    .BodyText {
      margin-bottom: 26px;
    }
    .Button {
      margin-top: 12px;

      @media only screen and (min-width: $BREAKPOINT) {
        margin-top: 24px;
      }
    }
  }

  &--right {
    display: none;
    margin: 40px 0;
    max-width: 100%;
    max-height: 580px;

    // The max width of the image
    @media only screen and (min-width: 640px) {
      max-width: 640px;
      display: none;
    }

    @media only screen and (min-width: $BREAKPOINT) {
      display: block;
      margin: 0;
      max-width: calc(100% - 610px); // 640px;
    }

    img {
      border-radius: 5px;
      display: block;
      // object-fit: contain;
      width: 100%;
      height: auto;
    }
  }

  #navigateBodyButton {
    display: none;

    @media only screen and (min-width: $BREAKPOINT) {
      display: inline-flex;
    }
  }

  #navigateFooterButton {
    display: inline-flex;

    @media only screen and (min-width: $BREAKPOINT) {
      display: none;
    }
  }

  // Align Copyright to the start
  .Footer {
    justify-content: center;

    .Copyright {
      display: none;
    }

    @media only screen and (min-width: $BREAKPOINT) {
      justify-content: start;
      .Copyright {
        display: block;
      }
    }
  }
}
</style>
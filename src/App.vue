<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Header from '@/components/layout/Header.vue'

@Component({
  components: {
    Header
  }
})
export default class App extends Vue { }
</script>

<style lang="scss">
body {
  @media only screen and (min-width: $BREAKPOINT) {
    background: url("./assets/Background.jpg");
    background-size: cover;
  }
}
#app {
  font-family: system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: $PRIMARY_COLOR;
  background: white;

  // width: 1440px;
  // height: 910px;

  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;

  /*Solves a problem in which the content is being cut when the div is smaller than its' wrapper:*/
  max-width: 100%;
  max-height: 100%;
  overflow: auto;

  display: flex;
  flex-direction: column;

  @media only screen and (min-width: $BREAKPOINT) {
    width: 1440px;
    height: 910px;
  }
}

/**
 * Minimal CSS reset
 */
html,
body {
  width: 100%;
  min-height: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
*,
:after,
:before {
  box-sizing: border-box;
  flex-shrink: 0;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
table {
  border-spacing: 0;
  border-collapse: collapse;
}

/*! system-font.css v2.0.2 | CC0-1.0 License | github.com/jonathantneal/system-font-css */
@font-face {
  font-family: system-ui;
  font-style: normal;
  font-weight: 300;
  src: local(".SFNS-Light"), local(".SFNSText-Light"),
    local(".HelveticaNeueDeskInterface-Light"), local(".LucidaGrandeUI"),
    local("Segoe UI Light"), local("Ubuntu Light"), local("Roboto-Light"),
    local("DroidSans"), local("Tahoma");
}

@font-face {
  font-family: system-ui;
  font-style: italic;
  font-weight: 300;
  src: local(".SFNS-LightItalic"), local(".SFNSText-LightItalic"),
    local(".HelveticaNeueDeskInterface-Italic"), local(".LucidaGrandeUI"),
    local("Segoe UI Light Italic"), local("Ubuntu Light Italic"),
    local("Roboto-LightItalic"), local("DroidSans"), local("Tahoma");
}

@font-face {
  font-family: system-ui;
  font-style: normal;
  font-weight: 400;
  src: local(".SFNS-Regular"), local(".SFNSText-Regular"),
    local(".HelveticaNeueDeskInterface-Regular"), local(".LucidaGrandeUI"),
    local("Segoe UI"), local("Ubuntu"), local("Roboto-Regular"),
    local("DroidSans"), local("Tahoma");
}

@font-face {
  font-family: system-ui;
  font-style: italic;
  font-weight: 400;
  src: local(".SFNS-Italic"), local(".SFNSText-Italic"),
    local(".HelveticaNeueDeskInterface-Italic"), local(".LucidaGrandeUI"),
    local("Segoe UI Italic"), local("Ubuntu Italic"), local("Roboto-Italic"),
    local("DroidSans"), local("Tahoma");
}

@font-face {
  font-family: system-ui;
  font-style: normal;
  font-weight: 500;
  src: local(".SFNS-Medium"), local(".SFNSText-Medium"),
    local(".HelveticaNeueDeskInterface-MediumP4"), local(".LucidaGrandeUI"),
    local("Segoe UI Semibold"), local("Ubuntu Medium"), local("Roboto-Medium"),
    local("DroidSans-Bold"), local("Tahoma Bold");
}

@font-face {
  font-family: system-ui;
  font-style: italic;
  font-weight: 500;
  src: local(".SFNS-MediumItalic"), local(".SFNSText-MediumItalic"),
    local(".HelveticaNeueDeskInterface-MediumItalicP4"),
    local(".LucidaGrandeUI"), local("Segoe UI Semibold Italic"),
    local("Ubuntu Medium Italic"), local("Roboto-MediumItalic"),
    local("DroidSans-Bold"), local("Tahoma Bold");
}

@font-face {
  font-family: system-ui;
  font-style: normal;
  font-weight: 700;
  src: local(".SFNS-Bold"), local(".SFNSText-Bold"),
    local(".HelveticaNeueDeskInterface-Bold"), local(".LucidaGrandeUI"),
    local("Segoe UI Bold"), local("Ubuntu Bold"), local("Roboto-Bold"),
    local("DroidSans-Bold"), local("Tahoma Bold");
}

@font-face {
  font-family: system-ui;
  font-style: italic;
  font-weight: 700;
  src: local(".SFNS-BoldItalic"), local(".SFNSText-BoldItalic"),
    local(".HelveticaNeueDeskInterface-BoldItalic"), local(".LucidaGrandeUI"),
    local("Segoe UI Bold Italic"), local("Ubuntu Bold Italic"),
    local("Roboto-BoldItalic"), local("DroidSans-Bold"), local("Tahoma Bold");
}
</style>

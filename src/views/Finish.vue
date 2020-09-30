<template>
  <Page :step="4" :steps="3">
    <div class="Finish">
      <div class="MapBox__Wrapper">
        <MapBox :accessToken="token" :mapStyle="style" @load="handleMapbox" />
      </div>
      <div class="Finish__Wrapper">
        <Title>{{ this.addressLabel }}</Title>
        <div>//Label</div>
        <!-- <BodyText>
          <span v-html="vendor.home.content" />
        </BodyText> -->
      </div>
    </div>

    <template slot="footer">
      <Button>
        <span>Download rapport</span>
        <SvgIcon icon="icon_download" />
      </Button>
    </template>
  </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import Page from '@/components/layout/Page.vue'
import Title from '@/components/Title.vue'
import BodyText from '@/components/BodyText.vue'

import Button from '@/components/Button.vue'
import SvgIcon from '@/components/common/SvgIcon.vue'
import vendor from '@/vendor'

import GeoCoder from '@/components/form/GeoCoder.vue'
import MapBox from '@/components/common/MapBox.vue'


@Component({
  components: {
    Page, Button, SvgIcon, Title, BodyText, GeoCoder,
    MapBox
  }
})
export default class Finish extends Vue {
  private addressLabel = '';
  private address = '';
  private addressCoordinates: Array<number> | null = null;
  private addressGeojson: JSON | null = null;

  private map: any;

  private token = process.env.VUE_APP_MAPBOX_TOKEN;
  private style = process.env.VUE_APP_MAPBOX_STYLE;

  created(): void {
    this.addressLabel = this.$store.state.addressLabel
    this.addressCoordinates = this.$store.state.addressCoordinates
    this.address = this.$store.state.address
    this.addressGeojson = this.$store.state.addressGeojson
  }

  private handleMapbox({ map }: Record<string, any>) {
    this.map = map
    if (this.addressCoordinates !== undefined && this.addressGeojson !== undefined) {
      this.handleCoordinates()
    }
  }

  private handleCoordinates() {
    if (this.map && this.addressCoordinates && this.addressGeojson) {
      this.map.getSource('address').setData(this.addressGeojson)
      this.map.flyTo({
        center: this.addressCoordinates,
        zoom: 18
      })
    }
  }

  private vendor = vendor
}
</script>

<style lang="scss">
.Finish {
  display: flex;
  justify-content: space-between;
  flex-direction: column-reverse;
  max-width: 100%;
  height: 100%;

  @media only screen and (min-width: $BREAKPOINT) {
    flex-direction: row-reverse;
  }

  .Finish__Wrapper {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    justify-content: flex-start;
    padding: 25px 20px;

    @media only screen and (min-width: $BREAKPOINT) {
      padding: 50px 80px;
    }

    .Title,
    .BodyText {
      margin-bottom: 26px;
    }

    .BodyText {
      margin-top: 26px;
    }

    .Button {
      margin-top: 24px;
    }
  }
  .MapBox__Wrapper {
    position: relative;

    max-width: 100%;
    width: 100%;
    min-height: 285px;
    height: calc(100vh - 406px);

    @media only screen and (min-width: $BREAKPOINT) {
      height: auto;
      width: calc(100% - 503px);
    }
  }
}
</style>
<template>
  <div class="Address">
    <div class="MapBox__Wrapper">
      <MapBox :accessToken="token" :mapStyle="style" @load="handleMapbox" />
    </div>
    <div class="Address__Wrapper">
      <Title>Funderingsrisico opvragen:</Title>

      <Form :busy="busy">
        <GeoCoder
          v-bind:address="this.address"
          :novalidate="false"
          label="Zoek het adres"
          id="address"
          :valid="isValid"
          @address="handleAddress"
        />
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import QuestionMixin from '@/components/questions/Question'

import Page from '@/components/layout/Page.vue'
import Title from '@/components/Title.vue'
import Button from '@/components/Button.vue'
import SvgIcon from '@/components/common/SvgIcon.vue'

import Form from '@/components/common/Form.vue'
import GeoCoder from '@/components/form/GeoCoder.vue'

import MapBox from '@/components/common/MapBox.vue'
import Address from '@/types/Address'

@Component({
  mixins: [QuestionMixin],
  components: {
    Page, Button, SvgIcon, Title,
    Form, GeoCoder,
    MapBox
  },
})
export default class AddressQuestion extends Mixins(QuestionMixin) {
  private address: Address | null = null;
  private map: any;

  private token = process.env.VUE_APP_MAPBOX_TOKEN;
  private style = process.env.VUE_APP_MAPBOX_STYLE;

  created(): void {
    this.address = this.$store.state.address
  }

  public get isValid(): boolean {
    return this.address !== null
  }

  public storeData(): void {
    this.$store.commit('updateState', [
      {
        key: 'address',
        value: this.address
      }
    ])
  }

  private handleMapbox({ map }: Record<string, any>) {
    this.map = map
    // if (this.address !== undefined) {
    //   this.handleCoordinates()
    // }
  }

  private async handleAddress(address: Address) {

    if (address === null) {
      console.log('handleaddress null return')
      return;
    }

    console.log('handleaddress address', address)

    const pdok = await fetch(`https://geodata.nationaalgeoregister.nl/locatieserver/v3/lookup?id=${address.id}`)
          .then(res => {
            if (!res.ok) throw new Error(res.statusText)
            return res.json()
          })

    console.log('pdok', pdok)
    let nummeraanduiding = `NL.IMBAG.NUMMERAANDUIDING.${pdok.response.docs[0].nummeraanduiding_id}`
    console.log('nummeraanduiding', nummeraanduiding)

    this.address = address;

    // TODO Beun
    this.address.id = nummeraanduiding;
    this.address.centroide_ll = pdok.response.docs[0].centroide_ll;

    console.log('this.address', this.address);

    this.handleCoordinates()
  }

  private handleCoordinates() {
    if (this.map && this.address) {

      //this.map.getSource('address').setData(target)
      this.map.flyTo({
        center: this.address.centerCoordinates,
        zoom: 18
      })
    }
  }


}
</script>

<style lang="scss">
.Address {
  display: flex;
  justify-content: space-between;
  flex-direction: column-reverse;
  max-width: 100%;
  height: 100%;

  @media only screen and (min-width: $BREAKPOINT) {
    flex-direction: row-reverse;
  }

  .Address__Wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 40%;
    max-width: 100%;
    justify-content: flex-start;
    padding: 25px 20px;

    @media only screen and (min-width: $BREAKPOINT) {
      padding: 50px 80px;
      height: 100%;
      width: 40%;
    }

    .Title,
    .BodyText {
      margin-bottom: 26px;
    }
    .Button {
      margin-top: 24px;
    }
  }
  .MapBox__Wrapper {
    position: relative;
    max-width: 100%;
    width: 100%;
    height: 60%;

    @media only screen and (min-width: $BREAKPOINT) {
      height: auto;
      width: 60%;
    }
  }
}
</style>
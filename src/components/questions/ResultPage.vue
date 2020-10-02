<template>
  <div class="Risk">
    <div class="Risk__Wrapper" v-if="this.risk !== null">
      <Title>{{ this.address.label_compact }}</Title>
      <RiskLabel :risk="this.risk" />
      <BodyText
        v-if="this.riskLabelDescription"
        v-html="this.riskLabelDescription"
      />
      <BodyText
        v-if="this.restorationCostDescripton"
        v-html="this.restorationCostDescripton"
      />
      <BodyText
        v-if="this.propertyDescription"
        v-html="this.propertyDescription"
      />
      <BodyText>
        <ul>
          <li v-if="this.risk.foundationType !== null">
            <strong>Funderingstype:</strong>
            {{ translateFoundationType(this.risk.foundationType) }}
          </li>
          <li
            v-if="
              this.risk.restorationCosts !== null &&
              this.restorationCostDescripton !== null
            "
          >
            <strong>Indicatieve herstelkosten:</strong>
            {{ this.formatter.format(this.risk.restorationCosts) }}
          </li>
        </ul>
      </BodyText>
    </div>
    <div class="MapBox__Wrapper">
      <MapBox :accessToken="token" :mapStyle="style" @load="handleMapbox" />
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

import BodyText from '@/components/BodyText.vue'
import RiskLabel from '@/components/RiskLabel.vue'

import MapBox from '@/components/common/MapBox.vue'
import Address from '@/types/Address'
import AnalysisRisk from '@/types/AnalysisRisk'
import FoundationType, { isPile, translate } from '@/types/FoundationType'
import FoundationRisk, { describe } from '@/types/FoundationRisk'

@Component({
  mixins: [QuestionMixin],
  components: {
    Page, Button, SvgIcon, Title,
    Form, GeoCoder, BodyText, RiskLabel,
    MapBox
  },
})
export default class ResultPage extends Mixins(QuestionMixin) {
  private address: Address | null = null;
  private risk: AnalysisRisk | null = null;
  private map: any;

  private token = process.env.VUE_APP_MAPBOX_TOKEN;
  private style = process.env.VUE_APP_MAPBOX_STYLE;

  private formatter = new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2
  })

  async created(): Promise<void> {
    this.address = this.$store.state.address

    const id = this.$store.state.address?.buildingId
    const json = await fetch(`${process.env.VUE_APP_API_BASE_URL}/api/incident-portal/risk?id=${id}`).then(res => {
      if (!res.ok) throw new Error(res.statusText)
      return res.json()
    })

    this.risk = new AnalysisRisk(
      json.neighborhoodId,
      json.foundationType,
      json.foundationRisk,
      json.restorationCosts,
      json.dewateringDepth,
      json.drystand,
      json.reliability
    )
  }

  get riskLabelDescription(): string | null {
    if (!this.risk) return null
    return describe(this.risk.foundationRisk)
  }

  get restorationCostDescripton(): string | null {
    if (!this.risk || ![FoundationRisk.C, FoundationRisk.D, FoundationRisk.E].includes(this.risk.foundationRisk)) return null
    return `Het pand heeft een verhoogd risico op funderingsproblematiek. Indien funderingsherstel noodzakelijk blijkt zijn de indicatieve funderingsherstelkosten geraamd op: <strong>${this.formatter.format(this.risk.restorationCosts)}</strong>.`
  }

  get propertyDescription(): string | null {
    if (!this.risk) return null

    if (isPile(this.risk.foundationType)) {
      if (this.risk.drystand !== null) {
        if (this.risk.drystand > 0) {
          return `Er komt regelmatig een droogstand van de fundering voor. De grondwaterstand staat ca. <strong>${Math.abs(this.risk.drystand).toFixed(2)}</strong> meter lager dan het hoogstgelegen funderingshout. Dat kan schimmelaantasting aan de houten paalfundering veroorzaken dat tot funderingsschade kan leiden.`
        }
        else {
          return `Er komt geen droogstand van de fundering voor. De grondwaterstand staat ca. <strong>${Math.abs(this.risk.drystand).toFixed(2)} meter</strong> hoger dan het hoogstgelegen funderingshout. Dat is gunstig voor het behoud van de fundering.`
        }
      }
    } else {
      if (this.risk.dewateringDepth !== null) {
        if (this.risk.dewateringDepth > 0) {
          return `Er komt regelmatig een ontwateringsdiepte van de fundering voor. De grondwaterstand staat ca. <strong>${Math.abs(this.risk.dewateringDepth).toFixed(2)} meter</strong> te hoog en komt daarmee dicht in de buurt van de fundering. Dat kan schadelijk voor het pand zijn.`
        } else {
          return `Er is doorgaans voldoende ontwateringsdiepte van de fundering. De grondwaterstand staat met een marge van ca. <strong>${Math.abs(this.risk.dewateringDepth).toFixed(2)} meter</strong> dieper dan de veilige zone.`
        }
      }
    }
    return null
  }

  translateFoundationType(input: FoundationType): string {
    return translate(input)
  }

  public get isValid(): boolean {
    return this.address !== undefined
  }

  public storeData(): void {
    return
  }

  private handleMapbox({ map }: Record<string, any>) {
    this.map = map
    if (this.address !== undefined) {
      this.handleCoordinates()
    }
  }

  get addressLabel(): string {
    return this.address ? this.address.label : '';
  }

  private handleCoordinates() {
    if (this.map && this.address) {
      this.map.getSource('address').setData(this.address.geojson)
      this.map.flyTo({
        center: this.address.coordinates,
        zoom: 18
      })
    }
  }

}
</script>

<style lang="scss">
.Risk {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;

  @media only screen and (min-width: $BREAKPOINT) {
    flex-direction: row;
  }

  &__Wrapper {
    flex-basis: auto;
    order: 1;

    display: flex;
    flex-direction: column;
    max-width: 100%;
    justify-content: flex-start;
    padding: 25px 20px;
    flex-basis: 66%;
    @media only screen and (min-width: $BREAKPOINT) {
      flex-basis: auto;
    }

    .Title,
    .BodyText {
      font-size: 17px;
      margin-bottom: 24px;
    }
    .RiskLabel {
      margin: 0 0 24px 0;
    }
  }
  .MapBox__Wrapper {
    order: 2;
    max-width: 100%;
    height: 265px;

    @media only screen and (min-width: $BREAKPOINT) {
      flex-basis: 66%;
      height: 100%;
    }
  }
}
</style>
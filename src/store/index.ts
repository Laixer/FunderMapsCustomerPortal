import Address from '@/types/Address'
import AnalysisRisk from '@/types/AnalysisRisk'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

type Prop = {
  key: string,
  value: string | number | Array<string | number | JSON>
}

interface State {
  [key: string]: any | null,
  firstName: null | string,
  lastName: null | string,
  email: null | string,
  address: null | Address
}

export default new Vuex.Store({
  state: {
    firstName: null,
    lastName: null,
    email: null,
    address: null,
    risk: null
  } as State,
  getters: {
    /**
     * Retrieve the indent request body
     */
    getRiskRequestBody(state) {
      const request = {
        "id": state.address?.buildingId,
      }
      return request
    },

    /**
     * Gets the current risk object from our state.
     */
    risk(state) {
      return state.risk;
    },

    /**
     * Gets the current address object from our state.
     */
    address(state) {
      return state.address;
    }
  },
  mutations: {
    updateState(state: State, props: Prop[]) {
      Object.entries(props).map((val) => {
        const prop: Prop = val[1]
        state[prop.key] = prop.value
      })
    },

    set_address(state, { address }) {
      state.address = address;
    },

    set_risk(state, { risk }) {
      state.risk = risk;
    }
  },
  actions: {
    /**
     * Gets the pdok address lookup from a pdok internal id.
     */
    async getPdokAddress({ commit, getters }, { pdokId }) {
      if (!pdokId) {
        console.log('Cant get address if pdokId is null');
        return;
      }

      const json = await fetch(`https://geodata.nationaalgeoregister.nl/locatieserver/v3/lookup?id=${pdokId}`)
        .then(res => {
          if (!res.ok) { 
            throw new Error(res.statusText)
          }
          return res.json();
        });

      // TODO This is really ugly
      const address : Address = new Address(
        json.response.docs[0].id,
        "", //item.buildingGeometry,
        "", //item.buildingId,
        "", //item.buildingNumber,
        "", //item.builtYear,
        "", //item.postalCode,
        "", //item.street,
        "" //item.city
      );
      address.weergavenaam = json.response.docs[0].weergavenaam;
      address.centroide_ll = json.response.docs[0].centroide_ll;

      // TODO Beun
      address.id = `NL.IMBAG.NUMMERAANDUIDING.${json.response.docs[0].nummeraanduiding_id}`;

      commit('set_address', { address });

      console.log('Getter for address', getters.address)
    },

    /**
     * Gets the risk from our data store.
     */
    async getRisk({ commit, getters }) {
      if (!getters.address) {
        console.log('Cant get risk if state address is null');
        return;
      }

      const riskResponse = await fetch(`${process.env.VUE_APP_API_BASE_URL}/api/incident-portal/risk2?id=${getters.address.id}`)
        .then(res => {
          if (!res.ok) { 
            throw new Error(res.statusText)
          }
          return res.json();
        });

      const risk = new AnalysisRisk(
        riskResponse.neighborhoodId,
        riskResponse.foundationType,
        riskResponse.foundationRisk,
        riskResponse.restorationCosts,
        riskResponse.dewateringDepth,
        riskResponse.drystand,
        riskResponse.reliability
      )

      commit('set_risk', { risk });

      console.log('Getter for risk', getters.risk)
    }
  },
  modules: {
  }
})

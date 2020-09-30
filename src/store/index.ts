import Address from '@/types/Address'
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
    }
  },
  mutations: {
    updateState(state: State, props: Prop[]) {
      Object.entries(props).map((val) => {
        const prop: Prop = val[1]
        state[prop.key] = prop.value
      })
    }
  },
  actions: {
  },
  modules: {
  }
})

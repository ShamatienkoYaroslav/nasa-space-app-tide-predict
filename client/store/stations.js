export const state = () => ({
  loading: false,
  items: []
})

export const mutations = {
  SET_ITEMS(state, items) { state.items = items },

  SET_LOADING(state, loading) { state.loading = loading }
}

export const actions = {
  async fetchItems({ commit }) {
    commit('SET_LOADING', true)

    try {
      const items = await this.$api.stations.getStations()
      commit('SET_ITEMS', items)
    } catch (error) {
      console.log(error);
    }

    commit('SET_LOADING', false)
  }
}

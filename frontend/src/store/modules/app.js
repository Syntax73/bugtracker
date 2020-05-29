const state = {
  drawer: null
};

const getters = {};

const actions = {
  toggleDrawer({ commit, state }) {
    commit('setDrawer', !state.drawer);
  }
};

const mutations = {
  setDrawer(state, drawer) {
    state.drawer = drawer;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

const state = {
  drawer: null,
  snackbar: false
};

const getters = {};

const actions = {
  toggleDrawer({ commit, state }) {
    commit('setDrawer', !state.drawer);
  },
  toggleSnackbar({ commit, state }) {
    commit('setSnackbar', !state.snackbar);
  }
};

const mutations = {
  setDrawer(state, drawer) {
    state.drawer = drawer;
  },
  setSnackbar(state, snackbar) {
    state.snackbar = snackbar;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

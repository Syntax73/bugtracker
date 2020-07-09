const state = {
  drawer: null,
  snackbar: false,
  snackbarContent: {
    message: '',
    alertType: ''
  }
};

const getters = {};

const actions = {
  toggleDrawer({ commit, state }) {
    commit('setDrawer', !state.drawer);
  },
  toggleSnackbar({ commit, state }, content) {
    commit('setSnackbar', !state.snackbar);
    commit('setSnackbarContent', content);
  }
};

const mutations = {
  setDrawer(state, drawer) {
    state.drawer = drawer;
  },
  setSnackbar(state, snackbar) {
    state.snackbar = snackbar;
  },
  setSnackbarContent(state, snackbar) {
    state.snackbarContent.message = snackbar.message;
    state.snackbarContent.alertType = snackbar.alertType;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

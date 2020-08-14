const state = {
  drawer: null,
  snackbar: false,
  snackbarContent: {
    message: '',
    alertType: ''
  },
  isAppLoading: false
};

const getters = {};

const actions = {
  toggleDrawer({ commit, state }) {
    commit('setDrawer', !state.drawer);
  },
  toggleSnackbar({ commit, state }, content) {
    commit('setSnackbar', !state.snackbar);
    commit('setSnackbarContent', content);
  },
  appLoading({ commit, state }) {
    commit('setAppLoading', !state.isAppLoading);
  }
};

const mutations = {
  setDrawer: (state, drawer) => (state.drawer = drawer),
  setSnackbar: (state, snackbar) => (state.snackbar = snackbar),
  setSnackbarContent(state, snackbar) {
    state.snackbarContent.message = snackbar.message;
    state.snackbarContent.alertType = snackbar.alertType;
  },
  setAppLoading: (state, isLoading) => (state.isAppLoading = isLoading)
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

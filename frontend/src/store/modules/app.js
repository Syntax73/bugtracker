import {
  SET_DRAWER,
  SET_SNACKBAR,
  SET_SNACKBAR_CONTENT,
  SET_APP_LOADING
} from '../multation-types';

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
    commit(SET_DRAWER, !state.drawer);
  },
  toggleSnackbar({ commit, state }, content) {
    commit(SET_SNACKBAR, !state.snackbar);
    commit(SET_SNACKBAR_CONTENT, content);
  },
  appLoading({ commit, state }) {
    commit(SET_APP_LOADING, !state.isAppLoading);
  }
};

const mutations = {
  [SET_DRAWER](state, drawer) {
    state.drawer = drawer;
  },
  [SET_SNACKBAR](state, snackbar) {
    state.snackbar = snackbar;
  },
  [SET_SNACKBAR_CONTENT](state, snackbar) {
    state.snackbarContent.message = snackbar.message;
    state.snackbarContent.alertType = snackbar.alertType;
  },
  [SET_APP_LOADING](state, isLoading) {
    state.isAppLoading = isLoading;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

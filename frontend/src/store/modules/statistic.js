import axios from '@/services/axios';

const state = {
  issuesIstatistics: []
};

const getters = {};

const actions = {
  async getStatistics({ commit, rootState }) {
    try {
      const { data } = await axios.get('/statistics');
      commit('setStatistics', data.data);
    } catch (err) {
      rootState.app.snackbar = true;
      rootState.app.snackbarContent.message = err.response.data.message;
      rootState.app.snackbarContent.alertType = 'warning';
    }
  }
};

const mutations = {
  setStatistics(state, statistics) {
    state.issuesIstatistics = statistics;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

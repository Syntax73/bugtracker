import axios from '@/services/axios';
import moment from 'moment';

const state = {
  issuesIstatistics: [],
  loaded: false
};

const getters = {};

const actions = {
  async getStatistics({ commit, rootState }) {
    try {
      commit('emptyStatistics', []);
      const { data } = await axios.get('/statistics');
      commit('setStatistics', data.data);
      commit('setLoaded', true);
    } catch (err) {
      rootState.app.snackbar = true;
      rootState.app.snackbarContent.message = err.response.data.message;
      rootState.app.snackbarContent.alertType = 'warning';
    }
  }
};

const mutations = {
  setStatistics(state, statistics) {
    statistics.forEach((d) => {
      const date = moment(d.date, 'YYYYMMDD').format('DD/MM/YYYY');
      const issues = parseInt(d.issues, 10);

      state.issuesIstatistics.push({ date, total: issues });
    });
  },
  setLoaded(state, isLoaded) {
    state.loaded = isLoaded;
  },
  emptyStatistics(state, empty) {
    state.issuesIstatistics = empty;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

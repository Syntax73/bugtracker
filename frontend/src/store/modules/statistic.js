import axios from '@/services/axios';
import moment from 'moment';

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
    statistics.forEach((d) => {
      const date = moment(d.date, 'YYYYMMDD').format('DD/MM/YYYY');
      const issues = d.issues;

      state.issuesIstatistics.push({ date, total: issues });
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

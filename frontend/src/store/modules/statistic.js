import { SET_STATISTIC, IS_STATISTIC_LOADED, RESET_STATISTIC } from '../multation-types';
import axios from '@/services/axios';
import moment from 'moment';

const state = {
  issuesIstatistics: [],
  issuesStatusIstatistics: [],
  userIssuesStatistics: [],
  loaded: false
};

const getters = {};

const actions = {
  async getStatistics({ commit }) {
    try {
      commit(RESET_STATISTIC);
      const { data } = await axios.get('/statistics');
      commit(SET_STATISTIC, data.data);
      commit(IS_STATISTIC_LOADED, true);
    } catch (err) {
      false;
    }
  }
};

const mutations = {
  [SET_STATISTIC](state, statistics) {
    statistics.issuesStatistics.forEach((d) => {
      const date = moment(d.date, 'YYYYMMDD').format('DD/MM/YYYY');
      const issues = parseInt(d.issues, 10);

      state.issuesIstatistics.push({ date, total: issues });
    });

    statistics.issuesStatusIstatistics.forEach((d) => {
      const { status, count } = d;

      state.issuesStatusIstatistics.push({ label: status, total: parseInt(count, 10) });
    });

    statistics.userIssuesStatistics.forEach((d) => {
      const date = moment(d.date, 'YYYYMMDD').format('DD/MM/YYYY');
      const issues = parseInt(d.issues, 10);

      state.userIssuesStatistics.push({ date, total: issues });
    });
  },
  [IS_STATISTIC_LOADED](state, isLoaded) {
    state.loaded = isLoaded;
  },
  [RESET_STATISTIC](state) {
    state.issuesIstatistics = [];
    state.issuesStatusIstatistics = [];
    state.userIssuesStatistics = [];
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

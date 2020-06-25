import axios from '@/services/axios';

const state = {
  issue: {},
  issues: []
};

const getters = {};

const actions = {
  async getIssues({ commit }, id) {
    try {
      const { data } = await axios.get(`/projects/${id}/issues`);
      commit('setIssues', data);
    } catch (err) {
      console.log(err);
    }
  }
};

const mutations = {
  setIssues(state, issues) {
    state.issues = issues;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

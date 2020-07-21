import axios from '@/services/axios';

const state = {
  assigments: []
};

const getters = {};

const actions = {
  async createAssigment({ commit, rootState }, { issueId, assigned }) {
    try {
      const { data } = await axios.post(`/issues/${issueId}/assigned`, { assigned: assigned });
      commit('setAssigment', data.data);
    } catch (err) {
      rootState.app.snackbar = true;
      rootState.app.snackbarContent.message = err.response.data.message;
      rootState.app.snackbarContent.alertType = 'warning';
    }
  }
};

const mutations = {
  setAssigment(state, assigned) {
    state.assigned = assigned;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

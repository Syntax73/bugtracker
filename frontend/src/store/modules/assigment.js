import axios from '@/services/axios';

const state = {
  assigments: []
};

const getters = {};

const actions = {
  async createAssigment({ commit, rootState, rootGetters }, { issueId, assigned }) {
    try {
      const payload = assigned
        .map((value) => {
          return {
            issue_id: issueId,
            user_id: value.id
          };
        })
        .pop();

      const { data } = await axios.post(`/issues/${issueId}/assigned`, { assigned: payload });
      const ids = data.data;
      commit('createAssigment', rootGetters['team/getPerson'](ids));
    } catch (err) {
      rootState.app.snackbar = true;
      rootState.app.snackbarContent.message = err.response.data.message;
      rootState.app.snackbarContent.alertType = 'warning';
    }
  },
  async deleteAssigment({ commit, rootState }, { issueId, userId }) {
    try {
      await axios.delete(`/issues/${issueId}/assigned/${userId.id}`);
      commit('deleteAssigment', userId);
    } catch (err) {
      rootState.app.snackbar = true;
      rootState.app.snackbarContent.message = err.response.data.message;
      rootState.app.snackbarContent.alertType = 'warning';
    }
  }
};

const mutations = {
  setAssigment(state, assigned) {
    state.assigments = assigned;
  },
  createAssigment(state, assigned) {
    if (state.assigments.lenght === 0) {
      state.assigments = assigned;
    } else {
      state.assigments.concat(assigned);
    }
  },
  deleteAssigment(state, userId) {
    const assigments = state.assigments.filter((a) => a != userId);
    state.assigments = assigments;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

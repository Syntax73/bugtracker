import axios from '@/services/axios';

const state = {
  assigments: []
};

const getters = {};

const actions = {
  async createAssigment({ commit, rootGetters }, { issueId, assigned }) {
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
      commit('createAssigment', rootGetters['team/getPerson'](data.data));
    } catch (err) {
      return Promise.reject(err.response.data.message);
    }
  },
  async deleteAssigment({ commit }, { issueId, userId }) {
    try {
      await axios.delete(`/issues/${issueId}/assigned/${userId.id}`);
      commit('deleteAssigment', userId);
    } catch (err) {
      return Promise.reject(err.response.data.message);
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

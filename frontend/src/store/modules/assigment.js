import { SET_ASSIGMENT, REMOVE_ASSIGMENT, CREATE_ASSIGMENT } from '../multation-types';
import assigmentService from '../../services/assigment-service';

const state = {
  assigments: []
};

const getters = {};

const actions = {
  async createAssigment({ commit, rootGetters }, { issueId, assigned }) {
    const response = await assigmentService.create(issueId, assigned);
    commit(CREATE_ASSIGMENT, rootGetters['team/getPerson'](response));
  },
  async deleteAssigment({ commit }, { issueId, userId }) {
    await assigmentService.destroy(issueId, userId);
    commit(REMOVE_ASSIGMENT, userId);
  }
};

const mutations = {
  [SET_ASSIGMENT](state, assigned) {
    state.assigments = assigned;
  },
  [CREATE_ASSIGMENT](state, assigned) {
    if (state.assigments.lenght === 0) {
      state.assigments = assigned;
    } else {
      state.assigments.concat(assigned);
    }
  },
  [REMOVE_ASSIGMENT](state, userId) {
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

import axios from '@/services/axios';

const state = {
  users: null
};

const getters = {};

const actions = {
  async getUsers({ commit }) {
    try {
      const { data } = await axios.get('/users');
      commit('setUsers', data);
    } catch (err) {
      console.log(err);
    }
  }
};

const mutations = {
  setUsers(state, users) {
    state.users = users;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

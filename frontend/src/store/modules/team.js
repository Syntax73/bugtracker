import axios from '@/services/axios';

const state = {
  team: [],
  pagination: {
    page: 1,
    itemsPerPage: 10,
    pageCount: 1,
    itemsLenght: 0
  }
};

const getters = {};

const actions = {
  async getTeam({ commit }, { id, page }) {
    try {
      const { data } = await axios.get(`/projects/${id}/team?page=${page}`);
      commit('setTeam', data);
    } catch (err) {
      console.log(err);
    }
  }
};

const mutations = {
  setTeam(state, team) {
    const { data, count, page, pages, limit } = team;
    state.team = data;
    state.pagination.page = page;
    state.pagination.pageCount = pages;
    state.pagination.itemsPerPage = limit;
    state.pagination.itemsLenght = count;
  },
  setPage(state, page) {
    state.pagination.page = page;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

import axios from '@/services/axios';

const state = {
  issue: {},
  issues: [],
  pagination: {
    page: 1,
    itemsPerPage: 10,
    pageCount: 1,
    itemsLenght: 0
  }
};

const getters = {};

const actions = {
  async getIssues({ commit }, { id, page }) {
    try {
      const { data } = await axios.get(`/projects/${id}/issues?page=${page}`);
      commit('setIssues', data);
    } catch (err) {
      console.log(err);
    }
  }
};

const mutations = {
  setIssues(state, issues) {
    const { data, count, page, pages, limit } = issues;
    state.issues = data;
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

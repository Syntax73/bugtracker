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
  async getIssues({ commit, rootState }, { id, page }) {
    try {
      const { data } = await axios.get(`/projects/${id}/issues?page=${page}`);
      commit('setIssues', data.data);
    } catch (err) {
      rootState.app.snackbar = true;
      rootState.app.snackbarContent.message = err.response.data.message;
      rootState.app.snackbarContent.alertType = 'warning';
    }
  },
  async getMyIssues({ commit, rootState }, page) {
    try {
      const { data } = await axios.get(`/issues?page=${page}`);
      commit('setIssues', data.data);
    } catch (err) {
      rootState.app.snackbar = true;
      rootState.app.snackbarContent.message = err.response.data.message;
      rootState.app.snackbarContent.alertType = 'warning';
    }
  },
  getIssue({ commit }, issue) {
    commit('setIssue', issue);
  }
};

const mutations = {
  setIssues(state, issues) {
    const { rows, count, page, pages, limit } = issues;
    state.issues = rows;
    state.pagination.page = page;
    state.pagination.pageCount = pages;
    state.pagination.itemsPerPage = limit;
    state.pagination.itemsLenght = count;
  },
  setIssue(state, issue) {
    state.issue = issue;
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

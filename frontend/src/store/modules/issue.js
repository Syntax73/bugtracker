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
  async create({ commit, rootState }, { id, newIssue }) {
    try {
      const { data } = await axios.post(`/projects/${id}/issues`, newIssue);
      commit('createIssue', data.data);
    } catch (err) {
      rootState.app.snackbar = true;
      rootState.app.snackbarContent.message = err.response.data.message;
      rootState.app.snackbarContent.alertType = 'warning';
    }
  },
  async update({ rootState }, { id, editedIssue }) {
    try {
      await axios.put(`/projects/${id}/issues/${editedIssue.id}`, editedIssue);
      // commit('updateIssue', data.data);
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
  },
  createIssue(state, issue) {
    if (state.issues.length < 10) {
      state.issues = state.issues.concat(issue);
      state.pagination.itemsLenght++;
    } else {
      state.pagination.itemsLenght++;
      const newTotalPages = state.pagination.itemsLenght / state.pagination.itemsPerPage;

      if (newTotalPages > state.pagination.pageCount) {
        state.pagination.pageCount++;
        state.pagination.page = newTotalPages;
      }
      state.pagination.page = state.pagination.pageCount;
    }
  },
  updateIssue(state, issue) {
    const issues = state.issues;
    const item = issues.find((i) => i.id === issue.id);
    const index = issues.indexOf(item);
    issues.splice(index, 1, issues);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

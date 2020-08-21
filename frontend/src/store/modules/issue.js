import { SET_ISSUE, SET_ISSUES, CREATE_ISSUE, UPDATE_ISSUE } from '../multation-types';
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
      commit(SET_ISSUES, data.data);
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  },
  async getMyIssues({ commit }, page) {
    try {
      const { data } = await axios.get(`/issues?page=${page}`);
      commit(SET_ISSUES, data.data);
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  },
  async create({ commit }, { id, newIssue }) {
    try {
      const { data } = await axios.post(`/projects/${id}/issues`, newIssue);
      commit(CREATE_ISSUE, data.data);
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  },
  async update({ commit }, { id, editedIssue }) {
    try {
      const { data } = await axios.put(`/projects/${id}/issues/${editedIssue.id}`, editedIssue);
      commit(UPDATE_ISSUE, data.data);
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  },
  getIssue({ commit }, issue) {
    commit(SET_ISSUE, issue);
  }
};

const mutations = {
  [SET_ISSUES](state, issues) {
    const { rows, count, page, pages, limit } = issues;
    state.issues = rows;
    state.pagination.page = page;
    state.pagination.pageCount = pages;
    state.pagination.itemsPerPage = limit;
    state.pagination.itemsLenght = count;
  },
  [SET_ISSUE](state, issue) {
    state.issue = issue;
  },
  setPage(state, page) {
    state.pagination.page = page;
  },
  [CREATE_ISSUE](state, issue) {
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
  [UPDATE_ISSUE](state, issue) {
    const issues = state.issues;
    const item = issues.find((i) => i.id === issue.id);
    const index = issues.indexOf(item);
    issues.splice(index, 1, issue);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

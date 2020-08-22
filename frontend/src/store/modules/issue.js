import { SET_ISSUE, SET_ISSUES, CREATE_ISSUE, UPDATE_ISSUE } from '../multation-types';
import issueService from '../../services/issue-service';

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
    const response = await issueService.getAll(id, page);
    commit(SET_ISSUES, response);
  },
  async getMyIssues({ commit }, page) {
    const response = await issueService.getUserIssues(page);
    commit(SET_ISSUES, response);
  },
  async create({ commit }, { id, newIssue }) {
    const response = await issueService.create(id, newIssue);
    commit(CREATE_ISSUE, response);
  },
  async update({ commit }, { id, editedIssue }) {
    const response = await issueService.update(id, editedIssue);
    commit(UPDATE_ISSUE, response);
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

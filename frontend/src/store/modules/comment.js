import { SET_COMMENT, SET_COMMENTS, CREATE_COMMENT, LOAD_MORE_COMMENTS } from '../multation-types';
import axios from '@/services/axios';

const state = {
  comment: {},
  comments: [],
  pagination: {
    page: 1,
    itemsPerPage: 10,
    pageCount: 1,
    itemsLenght: 0
  },
  loadMore: true
};

const getters = {};

const actions = {
  async getComments({ commit }, { id, page }) {
    try {
      const { data } = await axios.get(`issues/${id}/comment?page=${page}`);
      commit(SET_COMMENTS, data.data);
    } catch (err) {
      commit(LOAD_MORE_COMMENTS, false);
      return false;
    }
  },
  async createComment({ commit }, { id, comment }) {
    try {
      const { data } = await axios.post(`issues/${id}/comment`, comment);
      commit(CREATE_COMMENT, data.data);
    } catch (err) {
      return Promise.reject(err.response.data.message);
    }
  },
  getComment({ commit }, comment) {
    commit(SET_COMMENT, comment);
  }
};

const mutations = {
  [SET_COMMENTS](state, comments) {
    const { rows, count, page, pages, limit } = comments;
    if (Object.keys(rows).length === 0) {
      state.comments = rows;
    } else {
      state.comments = state.comments.concat(rows);
    }
    state.pagination.page = page;
    state.pagination.pageCount = pages;
    state.pagination.itemsPerPage = limit;
    state.pagination.itemsLenght = count;
  },
  [CREATE_COMMENT](state, comment) {
    state.comments = state.comments.concat(comment);
    state.pagination.itemsLenght++;
    const newTotalPages = state.pagination.itemsLenght / state.pagination.itemsPerPage;

    if (newTotalPages > state.pagination.pageCount) {
      state.pagination.pageCount++;
      state.pagination.page = newTotalPages;
    }
  },
  [SET_COMMENT](state, comment) {
    state.comment = comment;
  },
  setPage(state, page) {
    state.pagination.page = page;
  },
  [LOAD_MORE_COMMENTS](state, value) {
    state.loadMore = value;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

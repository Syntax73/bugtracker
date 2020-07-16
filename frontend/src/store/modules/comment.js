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
  async getComments({ commit, rootState }, { id, page }) {
    try {
      const { data } = await axios.get(`issues/${id}/comment?page=${page}`);
      commit('setComments', data.data);
    } catch (err) {
      commit('setLoadMore', false);
      rootState.app.snackbar = true;
      rootState.app.snackbarContent.message = err.response.data.message;
      rootState.app.snackbarContent.alertType = 'warning';
    }
  },
  async createComment({ commit, rootState }, { id, comment }) {
    try {
      const { data } = await axios.post(`issues/${id}/comment`, comment);
      commit('createComment', data.data);
    } catch (err) {
      rootState.app.snackbar = true;
      rootState.app.snackbarContent.message = err.response.data.message;
      rootState.app.snackbarContent.alertType = 'warning';
    }
  },
  getComment({ commit }, comment) {
    commit('setComment', comment);
  }
};

const mutations = {
  setComments(state, comments) {
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
  createComment(state, comment) {
    state.comments = state.comments.concat(comment);
    state.pagination.itemsLenght++;
    const newTotalPages = state.pagination.itemsLenght / state.pagination.itemsPerPage;

    if (newTotalPages > state.pagination.pageCount) {
      state.pagination.pageCount++;
      state.pagination.page = newTotalPages;
    }
  },
  setComment(state, comment) {
    state.comment = comment;
  },
  setPage(state, page) {
    state.pagination.page = page;
  },
  setLoadMore(state, value) {
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

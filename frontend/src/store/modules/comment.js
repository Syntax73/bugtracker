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
      commit('setComments', data);
    } catch (err) {
      commit('setLoadMore', false);
      console.log(err);
    }
  },
  getComment({ commit }, comment) {
    commit('setComment', comment);
  }
};

const mutations = {
  setComments(state, comments) {
    const { data, count, page, pages, limit } = comments;
    if (Object.keys(data).length === 0) {
      state.comments = data;
    } else {
      state.comments = state.comments.concat(data);
    }
    state.pagination.page = page;
    state.pagination.pageCount = pages;
    state.pagination.itemsPerPage = limit;
    state.pagination.itemsLenght = count;
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

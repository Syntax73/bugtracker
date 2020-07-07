import axios from '@/services/axios';

const state = {
  comment: {},
  comments: [],
  pagination: {
    page: 1,
    itemsPerPage: 10,
    pageCount: 1,
    itemsLenght: 0
  }
};

const getters = {};

const actions = {
  async getComments({ commit }, { idIssue, page }) {
    try {
      const { data } = await axios.get(`issues/${idIssue}/comment?page=${page}`);
      commit('setComments', data);
    } catch (err) {
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
    state.comments = data;
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
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

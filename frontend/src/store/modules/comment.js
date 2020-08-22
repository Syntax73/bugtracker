import {
  SET_COMMENT,
  SET_COMMENTS,
  CREATE_COMMENT,
  LOAD_MORE_COMMENTS,
  SET_PAGE
} from '../multation-types';
import commentService from '../../services/comment-service';

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
    const response = await commentService.getAll(id, page);
    if (response) {
      commit(SET_COMMENTS, response);
    } else {
      commit(LOAD_MORE_COMMENTS, false);
    }
  },
  async createComment({ commit }, { id, comment }) {
    const response = await commentService.create(id, comment);
    commit(CREATE_COMMENT, response);
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
  [SET_PAGE](state, page) {
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

import axios from '@/services/axios';

const state = {
  users: null,
  pagination: {
    page: 1,
    itemsPerPage: 2,
    pageCount: 0,
    itemsLenght: 0
  }
};

const getters = {
  getPageCount: (state) => {
    return state.pagination.pageCount;
  }
};

const actions = {
  async getUsers({ commit }, page) {
    try {
      const { data } = await axios.get(`/users?page=${page}`);
      commit('setUsers', data);
    } catch (err) {
      console.log(err);
    }
  }
};

const mutations = {
  setUsers(state, users) {
    const { data, count, page, pages, limit } = users;
    state.users = data;
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

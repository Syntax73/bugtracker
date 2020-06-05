import axios from '@/services/axios';

const state = {
  user: {},
  users: [],
  userDialog: false,
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
  },
  getItem({ commit }, user) {
    commit('setUser', user);
    commit('setUserDialog', true);
  },
  userDialog({ commit }, isOpen) {
    commit('setUserDialog', isOpen);
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
  },
  setUser(state, user) {
    state.user = user;
  },
  setUserDialog(state, isOpen) {
    state.userDialog = isOpen;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

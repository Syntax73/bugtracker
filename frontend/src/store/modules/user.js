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
  async createUser({ commit }, newUser) {
    try {
      const formData = new FormData();

      formData.append('avatar', newUser.avatar);
      formData.append('name', newUser.name);
      formData.append('email', newUser.email);
      formData.append('password', newUser.password);
      formData.append('confirmPassword', newUser.confirmPassword);
      formData.append('role', newUser.role);

      const { data } = await axios.post('/users', formData);

      commit('createUser', data);
      commit('setUserDialog', false);
      commit('setUser', {});
    } catch (err) {
      console.log(err);
    }
  },
  async updateUser({ commit }, user) {
    try {
      const { data } = await axios.put(`/users/${user.id}`, user);
      commit('updateUser', data);
      commit('setUserDialog', false);
      commit('setUser', {});
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
  },
  createUser(state, user) {
    if (state.users.length < 10) {
      state.users = state.users.concat(user);
    } else {
      state.pagination.pageCount++;
    }
  },
  updateUser(state, user) {
    const users = state.users;
    const item = users.find((i) => i.id == user.id);
    const index = users.indexOf(item);
    users.splice(index, 1, user);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

import { SET_USER, SET_USERS, CREATE_USER, UPDATE_USER } from '../multation-types';

import axios from '@/services/axios';
import moment from 'moment';

const state = {
  user: {},
  users: [],
  pagination: {
    page: 1,
    itemsPerPage: 10,
    pageCount: 1,
    itemsLenght: 0
  }
};

const getters = {
  getPageCount: (state) => {
    return state.pagination.pageCount;
  },
  getUsersFormated: (state) => {
    return state.users.map((data) => {
      return {
        ...data,
        createdAt: moment(data.createdAt).format('DD-MM-YYYY HH:mm'),
        updatedAt: moment(data.updatedAt).format('DD-MM-YYYY HH:mm')
      };
    });
  }
};

const actions = {
  async getUsers({ commit }, page) {
    try {
      const { data } = await axios.get(`/users?page=${page}`);
      commit(SET_USERS, data.data);
    } catch (err) {
      return Promise.reject(err.response.data.message);
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

      commit(CREATE_USER, data.data);
      commit(SET_USER, {});
    } catch (err) {
      return Promise.reject(err.response.data.message);
    }
  },
  async updateUser({ commit }, user) {
    try {
      const { data } = await axios.put(`/users/${user.id}`, user);
      commit(UPDATE_USER, data.data);
      commit(SET_USER, {});
    } catch (err) {
      return Promise.reject(err.response.data.message);
    }
  },
  async showUser({ commit }, id) {
    try {
      const { data } = await axios.get(`/users/${id}`);
      commit(SET_USER, data.data);
    } catch (err) {
      return Promise.reject(err.response.data.message);
    }
  },
  getItem({ commit }, user) {
    commit(SET_USER, user);
  }
};

const mutations = {
  [SET_USERS](state, users) {
    const { rows, count, page, pages, limit } = users;
    state.users = rows;
    state.pagination.page = page;
    state.pagination.pageCount = pages;
    state.pagination.itemsPerPage = limit;
    state.pagination.itemsLenght = count;
  },
  setPage(state, page) {
    state.pagination.page = page;
  },
  [SET_USER](state, user) {
    state.user = user;
  },
  [CREATE_USER](state, user) {
    if (state.users.length < 10) {
      state.users = state.users.concat(user);
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
  [UPDATE_USER](state, user) {
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

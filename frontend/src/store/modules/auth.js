import axios from '@/services/axios';
import { SET_TOKEN, SET_USER_SESSION, DESTROY_SESSION, SET_APP_LOADING } from '../multation-types';
import authService from '../../services/auth-service';

const state = {
  token: null,
  userSession: {}
};

const getters = {
  currentUser(state) {
    return state.userSession;
  },
  isAuth(state) {
    return state.token !== null;
  }
};

const actions = {
  async signin({ commit }, { email, password }) {
    commit(`app/${SET_APP_LOADING}`, true, { root: true });
    const { token, user } = await authService.signin(email, password);
    commit(SET_TOKEN, token);
    commit(SET_USER_SESSION, user);
    commit(`app/${SET_APP_LOADING}`, false, { root: true });
  },
  async singout({ commit, getters }) {
    if (getters.isAuth) {
      await authService.singout();
      commit(DESTROY_SESSION);
    }
  },
  async validateToken({ commit }) {
    commit(`app/${SET_APP_LOADING}`, true, { root: true });
    const { token, user } = await authService.validateToken();
    commit(SET_TOKEN, token);
    commit(SET_USER_SESSION, user);
    commit(`app/${SET_APP_LOADING}`, false, { root: true });
  }
};

const mutations = {
  [SET_TOKEN](state, token) {
    state.token = token;
  },
  [SET_USER_SESSION](state, user) {
    state.userSession = user;
  },
  [DESTROY_SESSION](state) {
    state.userSession = {};
    state.token = null;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

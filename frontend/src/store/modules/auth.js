import axios from '@/services/axios';
import { SET_TOKEN, SET_USER_SESSION, DESTROY_SESSION } from '../multation-types';

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
  signin({ commit }, { email, password }) {
    return new Promise((resolve, reject) => {
      axios
        .post('/session', { email, password })
        .then((res) => {
          const { token, user } = res.data.data;
          axios.defaults.headers.common.Authorization = `Bearer ${token}`;
          commit(SET_TOKEN, token);
          commit(SET_USER_SESSION, user);
          resolve(res);
        })
        .catch((err) => {
          reject(err.response.data);
        });
    });
  },
  async singout({ commit, getters }) {
    if (getters.isAuth) {
      await axios.post('/remove-token');
      axios.defaults.headers.common.Authorization = '';
      commit(DESTROY_SESSION);
    }
  },
  validateToken({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .post('/refresh-token')
        .then((res) => {
          const { token, user } = res.data.data;
          axios.defaults.headers.common.Authorization = `Bearer ${token}`;
          commit(SET_TOKEN, token);
          commit(SET_USER_SESSION, user);
          resolve(res);
        })
        .catch((err) => {
          axios.defaults.headers.common.Authorization = '';
          reject(err);
        });
    });
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

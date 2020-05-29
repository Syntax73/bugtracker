import axios from '@/services/axios';

const state = {
  token: null,
  userSession: {}
};

const getters = {};

const actions = {
  signin({ commit }, { email, password }) {
    return new Promise((resolve, reject) => {
      axios
        .post('/session', { email, password })
        .then((res) => {
          const { token, user } = res.data;
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          axios.defaults.headers.common.Authorization = `Bearer ${token}`;
          commit('setToken', token);
          commit('setUserSession', user);
          resolve(res);
        })
        .catch((err) => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          reject(err.response.data);
        });
    });
  },
  validateToken({ commit }) {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    commit('setToken', token);
    commit('setUserSession', user);
  }
};

const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  setUserSession(state, user) {
    state.userSession = user;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

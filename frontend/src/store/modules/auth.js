import axios from '@/services/axios';

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
  singout({ commit, getters }) {
    if (getters.isAuth) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      commit('destroySession');
    }
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
  },
  destroySession(state) {
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

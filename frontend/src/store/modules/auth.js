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
          const { token, user } = res.data.data;
          axios.defaults.headers.common.Authorization = `Bearer ${token}`;
          commit('setToken', token);
          commit('setUserSession', user);
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
      commit('destroySession');
    }
  },
  validateToken({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .post('/refresh-token')
        .then((res) => {
          const { token, user } = res.data.data;
          axios.defaults.headers.common.Authorization = `Bearer ${token}`;
          commit('setToken', token);
          commit('setUserSession', user);
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

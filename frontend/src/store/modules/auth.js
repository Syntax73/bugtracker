import axios from "@/plugins/axios";

const state = {
  token: null,
  userSession: {}
};

const getters = {};

const actions = {
  signin({ commit }, userData) {
    return new Promise((resolve, reject) => {
      axios
        .post("/session", { email: userData.email, password: userData.password })
        .then(res => {
          const { token, user } = res.data;
          localStorage.setItem("token", token);
          axios.defaults.headers.common.Authorization = `Bearer ${token}`;
          commit("setToken", token);
          commit("setUserSession", user);
          resolve(res);
        })
        .catch(err => {
          localStorage.removeItem("token");
          reject(err.response.data);
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
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

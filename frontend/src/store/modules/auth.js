import axios from "@/plugins/axios";

const state = {
  token: null
};

const getters = {};

const actions = {
  signin({ commit }, userData) {
    return new Promise((resolve, reject) => {
      axios
        .post("/session", { email: userData.email, password: userData.password })
        .then(res => {
          localStorage.setItem("token", res.data);
          axios.defaults.headers.common.Authorization = `Bearer ${res.data}`;
          commit("setToken", res.data);
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
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

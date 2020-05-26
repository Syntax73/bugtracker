import axios from "@/services/axios";

const state = {
  users: null
};

const getters = {};

const actions = {
  getUsers({ commit }) {
    axios
      .get("/users")
      .then(res => {
        commit("setUsers", res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const mutations = {
  setUsers(state, users) {
    state.users = users;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import app from "./modules/app";
import project from "./modules/project";
import user from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    app,
    project,
    user
  }
});

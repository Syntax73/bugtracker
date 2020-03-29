import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import app from './modules/app';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    app,
  },
});

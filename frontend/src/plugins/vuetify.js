import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    primary: '#3f51b5',
    secondary: '#673ab7',
    accent: '#9c27b0',
    error: '#e91e63',
    warning: '#f44336',
    info: '#2196f3',
    success: '#4caf50',
  },
});

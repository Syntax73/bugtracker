import axios from './axios';

const authService = {
  async signin(email, password) {
    try {
      const { data } = await axios.post('/session', { email, password });
      const { token, user } = data.data;
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      return { token, user };
    } catch (err) {
      return Promise.reject(err.response.data.message);
    }
  },
  async singout() {
    try {
      await axios.post('/remove-token');
      axios.defaults.headers.common.Authorization = '';
      return null;
    } catch (err) {
      return false;
    }
  },
  async validateToken() {
    try {
      const { data } = await axios.post('/refresh-token');
      const { token, user } = data.data;
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      return { token, user };
    } catch (err) {
      axios.defaults.headers.common.Authorization = '';
      return Promise.reject(err.response.data.message);
    }
  }
};

export default authService;

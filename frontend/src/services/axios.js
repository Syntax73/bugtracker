import axios from 'axios';
import store from '../store';
import jwtDecode from 'jwt-decode';

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API,
  withCredentials: true
});

const refresh = axios.create({
  baseURL: process.env.VUE_APP_API,
  withCredentials: true
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = store.state.auth.token;
    const originalRequest = config;
    if (token) {
      const { exp } = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        const { data } = await refresh.post('/refresh-token');
        originalRequest.headers.Authorization = `Bearer ${data.data.token}`;
        store.commit('auth/setToken', data.data.token);
      } else {
        originalRequest.headers.Authorization = `Bearer ${token}`;
      }
    }
    return originalRequest;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

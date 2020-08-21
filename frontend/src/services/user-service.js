import axios from './axios';

export const userService = {
  async getAll(page) {
    try {
      const { data } = await axios.get(`/users?page=${page}`);
      return data.data;
    } catch (err) {
      return Promise.reject(err.response.data.message);
    }
  },
  async getOne(id) {
    try {
      const { data } = await axios.get(`/users/${id}`);
      return data.data;
    } catch (err) {
      return Promise.reject(err.response.data.message);
    }
  },
  async create(newUser) {
    try {
      const formData = new FormData();

      formData.append('avatar', newUser.avatar);
      formData.append('name', newUser.name);
      formData.append('email', newUser.email);
      formData.append('password', newUser.password);
      formData.append('confirmPassword', newUser.confirmPassword);
      formData.append('role', newUser.role);

      const { data } = await axios.post('/users', formData);

      return data.data;
    } catch (err) {
      return Promise.reject(err.response.data.message);
    }
  },
  async update(user) {
    try {
      const { data } = await axios.put(`/users/${user.id}`, user);
      return data.data;
    } catch (err) {
      return Promise.reject(err.response.data.message);
    }
  }
};

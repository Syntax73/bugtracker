import axios from './axios';

const commentService = {
  async getAll(id, page) {
    try {
      const { data } = await axios.get(`issues/${id}/comment?page=${page}`);
      return data.data;
    } catch (err) {
      return false;
    }
  },
  async create(id, comment) {
    try {
      const { data } = await axios.post(`issues/${id}/comment`, comment);
      return data.data;
    } catch (err) {
      return Promise.reject(err.response.data.message);
    }
  }
};

export default commentService;

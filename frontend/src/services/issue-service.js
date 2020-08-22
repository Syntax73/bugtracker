import axios from './axios';

const issueService = {
  async getAll(id, page) {
    try {
      const { data } = await axios.get(`/projects/${id}/issues?page=${page}`);
      return data.data;
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  },
  async getUserIssues(page) {
    try {
      const { data } = await axios.get(`/issues?page=${page}`);
      return data.data;
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  },
  async create(id, newIssue) {
    try {
      const { data } = await axios.post(`/projects/${id}/issues`, newIssue);
      return data.data;
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  },
  async update(id, editedIssue) {
    try {
      const { data } = await axios.put(`/projects/${id}/issues/${editedIssue.id}`, editedIssue);
      return data.data;
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  }
};

export default issueService;

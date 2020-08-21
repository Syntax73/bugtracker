import axios from './axios';

export const projectService = {
  async getAll(page) {
    try {
      const { data } = await axios.get(`/projects?page=${page}`);
      return data.data;
    } catch (err) {
      return Promise.reject(err.response.data.message);
    }
  },
  async getOne(id) {
    try {
      const { data } = await axios.get(`/projects/${id}`);
      return data.data;
    } catch (err) {
      return Promise.reject(err.response.data.message);
    }
  },
  async getUserProjects(page) {
    try {
      const { data } = await axios.get(`/projects/my-projects?page=${page}`);
      return data.data;
    } catch (err) {
      return Promise.reject(err.response.data.message);
    }
  },
  async create(project, teamMembers) {
    const { name, description } = project;

    const team = teamMembers.map((users) => {
      return users.id;
    });

    try {
      const { data } = await axios.post('/projects', { name, description, team });
      return data.data;
    } catch (err) {
      return Promise.reject(err.response.data.message);
    }
  },
  async update(project, teamMembers) {
    const { id, name, description } = project;

    const team = teamMembers.map((users) => {
      return users.id;
    });

    try {
      const { data } = await axios.put(`/projects/${id}`, { name, description, team });
      return data.data;
    } catch (err) {
      return Promise.reject(err.response.data.message);
    }
  },
  async destroy(id) {
    try {
      await axios.delete(`/projects/${id}`);
      return null;
    } catch (err) {
      return Promise.reject(err.response.data.message);
    }
  }
};

import axios from './axios';

const teamService = {
  async getAll(idProject, page) {
    try {
      const { data } = await axios.get(`/projects/${idProject}/team?page=${page}`);
      return data.data;
    } catch (err) {
      return false;
    }
  }
};

export default teamService;

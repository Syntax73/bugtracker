import axios from './axios';

const statisticService = {
  async getAll() {
    try {
      const { data } = await axios.get('/statistics');
      return data.data;
    } catch (err) {
      false;
    }
  }
};

export default statisticService;

import axios from './axios';

const assigmentService = {
  async create(issueId, assigned) {
    try {
      const payload = assigned
        .map((value) => {
          return {
            issue_id: issueId,
            user_id: value.id
          };
        })
        .pop();

      const { data } = await axios.post(`/issues/${issueId}/assigned`, { assigned: payload });
      return data.data;
    } catch (err) {
      return Promise.reject(err.response.data.message);
    }
  },
  async destroy(issueId, userId) {
    try {
      await axios.delete(`/issues/${issueId}/assigned/${userId.id}`);
      return null;
    } catch (err) {
      return Promise.reject(err.response.data.message);
    }
  }
};

export default assigmentService;

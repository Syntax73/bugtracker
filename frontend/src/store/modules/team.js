import axios from '@/services/axios';

const state = {
  team: [],
  pagination: {
    page: 1,
    itemsPerPage: 10,
    pageCount: 1,
    itemsLenght: 0
  }
};

const getters = {
  getPerson: (state) => (assigned) => {
    const ids = assigned.map((id) => id.user_id);
    return state.team.filter((person) => ids.includes(person.id));
  }
};

const actions = {
  async getTeam({ commit }, { id, page }) {
    try {
      const { data } = await axios.get(`/projects/${id}/team?page=${page}`);
      commit('setTeam', data.data);
    } catch (err) {
      rootState.app.snackbar = true;
      rootState.app.snackbarContent.message = err.response.data.message;
      rootState.app.snackbarContent.alertType = 'warning';
    }
  }
};

const mutations = {
  setTeam(state, team) {
    const { rows, count, page, pages, limit } = team;
    state.team = rows;
    state.pagination.page = page;
    state.pagination.pageCount = pages;
    state.pagination.itemsPerPage = limit;
    state.pagination.itemsLenght = count;
  },
  setPage(state, page) {
    state.pagination.page = page;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

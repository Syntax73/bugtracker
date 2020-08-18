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
  getPersons: (state) => (assigned) => {
    const ids = assigned.map((id) => id.user_id);
    return state.team.filter((person) => ids.includes(person.id));
  },
  getPerson: (state) => (assigned) => {
    return state.team.filter((person) => person.id === assigned.user_id);
  }
};

const actions = {
  async getTeam({ commit }, { idProject, page }) {
    try {
      const { data } = await axios.get(`/projects/${idProject}/team?page=${page}`);
      commit('setTeam', data.data);
    } catch (err) {
      return false;
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

import { SET_TEAM, SET_PAGE } from '../multation-types';
import teamService from '../../services/team-service';

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
    const response = await teamService.getAll(idProject, page);
    commit(SET_TEAM, response);
  }
};

const mutations = {
  [SET_TEAM](state, team) {
    const { rows, count, page, pages, limit } = team;
    state.team = rows;
    state.pagination.page = page;
    state.pagination.pageCount = pages;
    state.pagination.itemsPerPage = limit;
    state.pagination.itemsLenght = count;
  },
  [SET_PAGE](state, page) {
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

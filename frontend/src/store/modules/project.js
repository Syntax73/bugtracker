import {
  SET_PROJECT,
  SET_PROJECTS,
  CREATE_PROJECT,
  UPDATE_PROJECT,
  REMOVE_PROJECT
} from '../multation-types';
import projectService from '../../services/project-service';
import moment from 'moment';

const state = {
  projects: [],
  project: {},
  team: [],
  pagination: {
    page: 1,
    itemsPerPage: 10,
    pageCount: 1,
    itemsLenght: 0
  }
};

const getters = {
  getTeam: (state) => {
    return state.team;
  },
  getPageCount: (state) => {
    return state.pagination.pageCount;
  },
  getProjectsFormated: (state) => {
    return state.projects.map((data) => {
      return {
        ...data,
        createdAt: moment(data.createdAt).format('DD-MM-YYYY HH:mm'),
        updatedAt: moment(data.updatedAt).format('DD-MM-YYYY HH:mm')
      };
    });
  }
};

const actions = {
  async getProjects({ commit }, page) {
    const response = await projectService.getAll(page);
    commit(SET_PROJECTS, response);
  },
  async getProject({ commit }, project) {
    const response = await projectService.getOne(project.id);
    commit(SET_PROJECT, project);
    commit('setTeam', response.team);
  },
  async getMyProjects({ commit }, page) {
    const response = await projectService.getUserProjects(page);
    commit(SET_PROJECTS, response);
  },
  setTeam({ commit }, newTeam) {
    commit('setTeam', newTeam);
  },
  async create({ commit }, { project, teamMembers }) {
    const response = await projectService.create(project, teamMembers);
    commit(CREATE_PROJECT, response);
    commit(SET_PROJECT, {});
    commit('setTeam', []);
  },
  async update({ commit }, { project, teamMembers }) {
    const response = await projectService.update(project, teamMembers);
    commit(UPDATE_PROJECT, response);
    commit(SET_PROJECT, {});
    commit('setTeam', []);
  },
  async destroy({ commit }, { id }) {
    await projectService.destroy(id);
    commit(REMOVE_PROJECT, id);
  }
};

const mutations = {
  [SET_PROJECTS](state, projects) {
    const { rows, count, page, pages, limit } = projects;
    state.projects = rows;
    state.pagination.page = page;
    state.pagination.pageCount = pages;
    state.pagination.itemsPerPage = limit;
    state.pagination.itemsLenght = count;
  },
  [SET_PROJECT](state, project) {
    state.project = project;
  },
  // Talvez não é a melhor maneira de lidar com paginação
  [CREATE_PROJECT](state, project) {
    if (state.projects.length < 10) {
      state.projects = state.projects.concat(project);
      state.pagination.itemsLenght++;
    } else {
      state.pagination.itemsLenght++;
      const newTotalPages = state.pagination.itemsLenght / state.pagination.itemsPerPage;

      if (newTotalPages > state.pagination.pageCount) {
        state.pagination.pageCount++;
        state.pagination.page = newTotalPages;
      }
      state.pagination.page = state.pagination.pageCount;
    }
  },
  [UPDATE_PROJECT](state, project) {
    const projects = state.projects;
    const item = projects.find((i) => i.id === project.id);
    const index = projects.indexOf(item);
    projects.splice(index, 1, project);
  },
  [REMOVE_PROJECT](state, id) {
    const projects = state.projects.filter((p) => p.id != id);
    state.projects = projects;
  },
  setTeam(state, newTeam) {
    state.team = newTeam;
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

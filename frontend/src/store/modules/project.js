import {
  SET_PROJECT,
  SET_PROJECTS,
  CREATE_PROJECT,
  UPDATE_PROJECT,
  REMOVE_PROJECT
} from '../multation-types';

import axios from '@/services/axios';
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
    try {
      const { data } = await axios.get(`/projects?page=${page}`);
      commit(SET_PROJECTS, data.data);
    } catch (err) {
      return Promise.reject(err.response.data.message);
    }
  },
  async getProject({ commit }, project) {
    try {
      const { data } = await axios.get(`/projects/${project.id}`);
      commit(SET_PROJECT, project);
      commit('setTeam', data.data.team);
    } catch (err) {
      return Promise.reject(err.response.data.message);
    }
  },
  async getMyProjects({ commit }, page) {
    try {
      const { data } = await axios.get(`/projects/my-projects?page=${page}`);
      commit(SET_PROJECTS, data.data);
    } catch (err) {
      return Promise.reject(err.response.data.message);
    }
  },
  setTeam({ commit }, newTeam) {
    commit('setTeam', newTeam);
  },
  async create({ commit }, { project, teamMembers }) {
    const { name, description } = project;

    const team = teamMembers.map((users) => {
      return users.id;
    });

    try {
      const { data } = await axios.post('/projects', { name, description, team });
      commit(CREATE_PROJECT, data.data);
      commit(SET_PROJECT, {});
      commit('setTeam', []);
    } catch (err) {
      return Promise.reject(err.response.data.message);
    }
  },
  async update({ commit }, { project, teamMembers }) {
    const { id, name, description } = project;

    const team = teamMembers.map((users) => {
      return users.id;
    });

    try {
      const { data } = await axios.put(`/projects/${id}`, { name, description, team });
      commit(UPDATE_PROJECT, data.data);
      commit(SET_PROJECT, {});
      commit('setTeam', []);
    } catch (err) {
      return Promise.reject(err.response.data.message);
    }
  },
  async destroy({ commit }, { id }) {
    try {
      await axios.delete(`/projects/${id}`);
      commit(REMOVE_PROJECT, id);
    } catch (err) {
      return Promise.reject(err.response.data.message);
    }
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

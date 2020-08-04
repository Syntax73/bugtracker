import axios from '@/services/axios';

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
  }
};

const actions = {
  async getProjects({ commit }, page) {
    try {
      const { data } = await axios.get(`/projects?page=${page}`);
      commit('setProjects', data.data);
    } catch (err) {
      rootState.app.snackbar = true;
      rootState.app.snackbarContent.message = err.response.data.message;
      rootState.app.snackbarContent.alertType = 'warning';
    }
  },
  async getProject({ commit }, project) {
    try {
      const { data } = await axios.get(`/projects/${project.id}`);
      commit('setProject', project);
      commit('setTeam', data.data.team);
    } catch (err) {
      rootState.app.snackbar = true;
      rootState.app.snackbarContent.message = err.response.data.message;
      rootState.app.snackbarContent.alertType = 'warning';
    }
  },
  setTeam({ commit }, newTeam) {
    commit('setTeam', newTeam);
  },
  async create({ commit, rootState }, { project, teamMembers }) {
    const { name, description } = project;

    const team = teamMembers.map((users) => {
      return users.id;
    });

    try {
      const { data } = await axios.post('/projects', { name, description, team });
      commit('createProject', data.data);
      commit('setProject', {});
      commit('setTeam', []);
    } catch (err) {
      rootState.app.snackbar = true;
      rootState.app.snackbarContent.message = err.response.data.message;
      rootState.app.snackbarContent.alertType = 'warning';
    }
  },
  async update({ commit }, { project, teamMembers }) {
    const { id, name, description } = project;

    const team = teamMembers.map((users) => {
      return users.id;
    });

    try {
      const { data } = await axios.put(`/projects/${id}`, { name, description, team });
      commit('updateProject', data.data);
      commit('setProject', {});
      commit('setTeam', []);
    } catch (err) {
      rootState.app.snackbar = true;
      rootState.app.snackbarContent.message = err.response.data.message;
      rootState.app.snackbarContent.alertType = 'warning';
    }
  },
  async destroy({ commit }, { id }) {
    try {
      await axios.delete(`/projects/${id}`);
      commit('deleteProject', id);
    } catch (err) {
      rootState.app.snackbar = true;
      rootState.app.snackbarContent.message = err.response.data.message;
      rootState.app.snackbarContent.alertType = 'warning';
    }
  },
  projectDialog({ commit }, isOpen) {
    commit('setProjectDialog', isOpen);
  }
};

const mutations = {
  setProjects(state, projects) {
    const { rows, count, page, pages, limit } = projects;
    state.projects = rows;
    state.pagination.page = page;
    state.pagination.pageCount = pages;
    state.pagination.itemsPerPage = limit;
    state.pagination.itemsLenght = count;
  },
  setProject(state, project) {
    state.project = project;
  },
  // Talvez não é a melhor maneira de lidar com paginação
  createProject(state, project) {
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
  updateProject(state, project) {
    const projects = state.projects;
    const item = projects.find((i) => i.id === project.id);
    const index = projects.indexOf(item);
    projects.splice(index, 1, project);
  },
  deleteProject(state, id) {
    const projects = state.projects.filter((p) => p.id != id);
    state.projects = projects;
  },
  setProjectDialog(state, isOpen) {
    state.projectDialog = isOpen;
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

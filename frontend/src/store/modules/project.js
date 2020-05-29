import axios from '@/services/axios';

const state = {
  projects: [],
  project: {},
  projectDialog: false,
  team: []
};

const getters = {
  getTeam: (state) => {
    return state.team;
  }
};

const actions = {
  async getProjects({ commit }) {
    try {
      const { data } = await axios.get('/projects');
      commit('setProjects', data);
    } catch (err) {
      console.log(err);
    }
  },
  async getItem({ commit }, project) {
    try {
      const { data } = await axios.get(`/projects/${project.id}`);
      commit('setProject', project);
      commit('setTeam', data.team);
      commit('setProjectDialog', true);
    } catch (err) {
      console.log(err);
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
      commit('createProject', data);
      commit('setProjectDialog', false);
    } catch (err) {
      console.log(err);
    }
  },
  async update({ commit }, { project, teamMembers }) {
    const { id, name, description } = project;

    const team = teamMembers.map((users) => {
      return users.id;
    });

    try {
      const { data } = await axios.put(`/projects/${id}`, { name, description, team });
      commit('updateProject', data);
      commit('setProjectDialog', false);
    } catch (err) {
      console.log(err);
    }
  },
  async destroy({ commit }, { id }) {
    try {
      await axios.delete(`/projects/${id}`);
      commit('deleteProject', id);
    } catch (err) {
      console.log(err);
    }
  },
  projectDialog({ commit }, isOpen) {
    commit('setProjectDialog', isOpen);
  }
};

const mutations = {
  setProjects(state, projects) {
    state.projects = projects;
  },
  setProject(state, project) {
    state.project = project;
  },
  createProject(state, project) {
    state.projects = state.projects.concat(project);
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
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

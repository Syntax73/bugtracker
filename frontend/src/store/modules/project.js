import axios from "@/services/axios";

const state = {
  projects: [],
  project: {}
};

const getters = {};

const actions = {
  getProjects({ commit }) {
    axios
      .get("/projects")
      .then(res => {
        commit("setProjects", res.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  getItem({ commit }, project) {
    commit("setProject", project);
  },
  create({ commit }, { name, description }) {
    axios
      .post("/projects", { name, description })
      .then(res => {
        commit("createProject", res.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  update({ commit }, { id, name, description }) {
    axios
      .put(`/projects/${id}`, { name, description })
      .then(res => {
        commit("updateProject", res.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  destroy({ commit }, { id }) {
    axios
      .delete(`/projects/${id}`)
      .then(() => {
        commit("deleteProject", id);
      })
      .catch(err => console.log(err));
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
    const item = projects.find(i => i.id === project.id);
    const index = projects.indexOf(item);
    projects.splice(index, 1, project);
  },
  deleteProject(state, id) {
    const projects = state.projects.filter(p => p.id != id);
    state.projects = projects;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

import axios from "@/services/axios";

const state = {
  projects: [],
  project: {},
  projectDialog: false
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
    commit("setProjectDialog", true);
  },
  create({ commit }, { project, selectedUsers }) {
    const { name, description } = project;

    const team = selectedUsers.map(users => {
      return users.id;
    });

    axios
      .post("/projects", { name, description, team })
      .then(res => {
        commit("createProject", res.data);
        commit("setProjectDialog", false);
      })
      .catch(err => {
        console.log(err);
      });
  },
  //TODO passar id dos usuarios no update
  update({ commit }, { id, name, description }) {
    axios
      .put(`/projects/${id}`, { name, description })
      .then(res => {
        commit("updateProject", res.data);
        commit("setProjectDialog", false);
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
  },
  projectDialog({ commit }, isOpen) {
    commit("setProjectDialog", isOpen);
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
  },
  setProjectDialog(state, isOpen) {
    state.projectDialog = isOpen;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

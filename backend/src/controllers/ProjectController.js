const Project = require('../models/Project');
const ApiResponse = require('../helpers/apiResponse');
const { paginate, buildPagination } = require('../helpers/paginate');

class ProjectController {
  async index(req, res) {
    const { page } = req.query;
    const limit = 10;
    const http = new ApiResponse(res);

    try {
      const projects = await Project.findAndCountAll({
        ...paginate(page, limit),
      });

      return http.ok(buildPagination(projects, page, limit));
    } catch (err) {
      return http.serverError();
    }
  }

  async show(req, res) {
    const { id } = req.params;
    const http = new ApiResponse(res);

    try {
      const project = await Project.findByPk(id, {
        include: {
          association: 'team',
          attributes: ['id', 'avatar', 'name', 'email', 'role'],
          through: {
            attributes: [],
          },
        },
      });

      if (!project) {
        return http.badResquest('Projeto não encontrado');
      }

      return http.ok(project);
    } catch (err) {
      return http.serverError();
    }
  }

  async store(req, res) {
    const { name, description, team } = req.body;
    const http = new ApiResponse(res);

    try {
      const project = await Project.create({ name, description });

      if (team && team.length > 0) {
        project.setTeam(team);
      }

      return http.created(project);
    } catch (err) {
      return http.serverError();
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, description, team } = req.body;
    const http = new ApiResponse(res);

    try {
      const reqProject = await Project.findByPk(id);

      if (!reqProject) {
        return http.badResquest('Projeto não encontrado');
      }

      const project = await reqProject.update({ name, description });

      if (team) {
        project.setTeam(team);
      }

      return http.ok(project);
    } catch (err) {
      return http.serverError();
    }
  }

  async destroy(req, res) {
    const { id } = req.params;
    const http = new ApiResponse(res);

    try {
      const reqProject = await Project.findByPk(id);

      if (!reqProject) {
        return http.badResquest('Projeto não encontrado');
      }

      await reqProject.destroy();

      return http.noContent(res);
    } catch (err) {
      return http.serverError();
    }
  }
}

module.exports = new ProjectController();

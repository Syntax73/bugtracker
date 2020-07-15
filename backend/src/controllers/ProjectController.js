const Project = require('../models/Project');
const ApiResponse = require('../helpers/apiResponse');
const { paginate, buildPagination } = require('../helpers/paginate');

class ProjectController {
  async index(req, res) {
    const { page } = req.query;
    const limit = 10;

    const projects = await Project.findAndCountAll({
      ...paginate(page, limit),
    });

    return ApiResponse.ok(buildPagination(projects, page, limit), res);
  }

  async show(req, res) {
    const { id } = req.params;

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
      return ApiResponse.badResquest('Projeto não encontrado', res);
    }

    return res.json(project);
  }

  async store(req, res) {
    const { name, description, team } = req.body;

    const project = await Project.create({ name, description });

    if (team && team.length > 0) {
      project.setTeam(team);
    }

    return ApiResponse.created(project, res);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, description, team } = req.body;

    const reqProject = await Project.findByPk(id);

    if (!reqProject) {
      return ApiResponse.badResquest('Projeto não encontrado', res);
    }

    const project = await reqProject.update({ name, description });

    if (team) {
      project.setTeam(team);
    }

    return ApiResponse.ok(project, res);
  }

  async destroy(req, res) {
    const { id } = req.params;

    const reqProject = await Project.findByPk(id);

    if (!reqProject) {
      return res.status(404).json({ message: 'Projeto não encontrado' });
    }

    await reqProject.destroy();

    return ApiResponse.noContent(res);
  }
}

module.exports = new ProjectController();

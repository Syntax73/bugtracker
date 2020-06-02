const Project = require('../models/Project');
const { paginate, buildPagination } = require('../config/paginate');

class ProjectController {
  async index(req, res) {
    const { page } = req.query;

    const projects = await Project.findAndCountAll({
      ...paginate({ page, limit: 10 }),
    });

    return res.json(buildPagination(projects, page, 10));
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
      return res.status(404).json({ message: 'Project não encontrado' });
    }

    return res.json(project);
  }

  async store(req, res) {
    const { name, description, team } = req.body;

    const project = await Project.create({ name, description });

    if (team && team.length > 0) {
      project.setTeam(team);
    }

    return res.status(201).json(project);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, description, team } = req.body;

    const reqProject = await Project.findByPk(id);

    if (!reqProject) {
      return res.status(404).json({ message: 'Projeto não encontrado' });
    }

    const project = await reqProject.update({ name, description });

    if (team) {
      project.setTeam(team);
    }

    return res.json(project);
  }

  async destroy(req, res) {
    const { id } = req.params;

    const reqProject = await Project.findByPk(id);

    if (!reqProject) {
      return res.status(404).json({ message: 'Projeto não encontrado' });
    }

    await reqProject.destroy();

    return res.status(204).send();
  }
}

module.exports = new ProjectController();

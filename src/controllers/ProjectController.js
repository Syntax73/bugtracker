const Project = require('../models/Project');

class ProjectController {
  async index(req, res) {
    const projects = await Project.findAll();

    return res.json(projects);
  }

  async show(req, res) {
    const { id } = req.params;

    const project = await Project.findByPk(id);

    return res.json(project);
  }

  async store(req, res) {
    const { name, description } = req.body;

    const project = await Project.create({ name, description });

    return res.status(201).json(project);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;

    const reqProject = await Project.findByPk(id);

    if (!reqProject) {
      return res.status(404).json({ message: 'Projeto não encontrado' });
    }

    const project = await reqProject.update({ name, description });

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

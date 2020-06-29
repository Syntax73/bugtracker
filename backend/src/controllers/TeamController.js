const sequelize = require('../database');
const Project = require('../models/Project');
const { paginate } = require('../config/paginate');

class TeamController {
  async index(req, res) {
    const { project_id: id } = req.params;
    const { page } = req.query;
    const limit = 3;

    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({ message: 'Projeto não encontrado' });
    }

    // TODO paginação não funciona de maneira correta
    const team = await project.getTeam({
      ...paginate(page, limit),
      attributes: ['id', 'avatar', 'name', 'email', 'role'],
      joinTableAttributes: [],
    });

    return res.json(team);
  }
}

module.exports = new TeamController();

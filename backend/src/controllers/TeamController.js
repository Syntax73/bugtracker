const Project = require('../models/Project');

class TeamController {
  async index(req, res) {
    const { project_id: id } = req.params;

    const project = await Project.findByPk(id, {
      include: {
        association: 'team',
        attributes: ['avatar', 'name', 'email', 'role'],
        through: {
          attributes: [],
        },
      },
    });

    if (!project) {
      return res.status(404).json({ message: 'Projeto não encontrado' });
    }

    return res.json(project.team);
  }
}

module.exports = new TeamController();

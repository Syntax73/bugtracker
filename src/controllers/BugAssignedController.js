const Project = require('../models/Project');
const BugAssigned = require('../models/BugAssigned');

class BugAssignedController {
  async store(req, res) {
    const { project_id: projecId, bug_id: bugId } = req.params;
    const { assigned } = req.body;

    const project = await Project.findByPk(projecId, {
      include: { association: 'bugs', where: { id: bugId } },
    });

    if (!project) {
      return res
        .status(404)
        .json({ message: 'Projeto ou Bug não encontrados' });
    }

    const joj = await BugAssigned.create({
      bug_id: bugId,
      user_id: assigned,
    });

    return res.status(201).json(joj);
  }

  async destroy(req, res) {
    const { project_id: projecId, bug_id: bugId } = req.params;
    const { assigned } = req.body;

    const project = await Project.findByPk(projecId, {
      include: { association: 'bugs', where: { id: bugId } },
    });

    if (!project) {
      return res
        .status(404)
        .json({ message: 'Projeto ou Bug não encontrados' });
    }

    await BugAssigned.destroy({ where: { bug_id: bugId, user_id: assigned } });

    return res.send();
  }
}

module.exports = new BugAssignedController();

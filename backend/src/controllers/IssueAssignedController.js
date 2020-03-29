const Project = require('../models/Project');
const IssueAssigned = require('../models/IssueAssigned');

class IssueAssignedController {
  async store(req, res) {
    const { project_id: projecId, issue_id: issueId } = req.params;
    const { assigned } = req.body;

    const project = await Project.findByPk(projecId, {
      include: { association: 'issues', where: { id: issueId } },
    });

    if (!project) {
      return res
        .status(404)
        .json({ message: 'Projeto ou Bug não encontrados' });
    }

    const joj = await IssueAssigned.create({
      issue_id: issueId,
      user_id: assigned,
    });

    return res.status(201).json(joj);
  }

  async destroy(req, res) {
    const { project_id: projecId, issue_id: issueId } = req.params;
    const { assigned } = req.body;

    const project = await Project.findByPk(projecId, {
      include: { association: 'issues', where: { id: issueId } },
    });

    if (!project) {
      return res
        .status(404)
        .json({ message: 'Projeto ou Bug não encontrados' });
    }

    await IssueAssigned.destroy({
      where: { issue_id: issueId, user_id: assigned },
    });

    return res.send();
  }
}

module.exports = new IssueAssignedController();

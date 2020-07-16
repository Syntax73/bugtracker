const Project = require('../models/Project');
const IssueAssigned = require('../models/IssueAssigned');
const ApiResponse = require('../helpers/apiResponse');

class IssueAssignedController {
  async store(req, res) {
    const { project_id: projecId, issue_id: issueId } = req.params;
    const { assigned } = req.body;
    const http = new ApiResponse(res);

    try {
      const project = await Project.findByPk(projecId, {
        include: { association: 'issues', where: { id: issueId } },
      });

      if (!project) {
        return http.badResquest('Projeto ou Bug não encontrados');
      }

      const assignment = await IssueAssigned.create({
        issue_id: issueId,
        user_id: assigned,
      });

      return http.created(assignment);
    } catch (err) {
      return http.serverError();
    }
  }

  async destroy(req, res) {
    const { project_id: projecId, issue_id: issueId } = req.params;
    const { assigned } = req.body;
    const http = new ApiResponse(res);

    try {
      const project = await Project.findByPk(projecId, {
        include: { association: 'issues', where: { id: issueId } },
      });

      if (!project) {
        return http.badResquest('Projeto ou Bug não encontrados');
      }

      await IssueAssigned.destroy({
        where: { issue_id: issueId, user_id: assigned },
      });

      return http.noContent();
    } catch (err) {
      return http.serverError();
    }
  }
}

module.exports = new IssueAssignedController();

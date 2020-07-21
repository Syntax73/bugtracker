const Issue = require('../models/Issue');
const IssueAssigned = require('../models/IssueAssigned');
const ApiResponse = require('../helpers/apiResponse');

class IssueAssignedController {
  async store(req, res) {
    const { issue_id: issueId } = req.params;
    const { assigned } = req.body;
    const http = new ApiResponse(res);

    try {
      const issue = await Issue.findByPk(issueId);

      if (!issue) {
        return http.badResquest('Issue não encontrada');
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
    const { issue_id: issueId, user_id: userId } = req.params;
    const http = new ApiResponse(res);

    try {
      const issue = await Issue.findByPk(issueId);

      if (!issue) {
        return http.badResquest('Issue não encontrada');
      }

      await IssueAssigned.destroy({
        where: { issue_id: issueId, user_id: userId },
      });

      return http.noContent();
    } catch (err) {
      return http.serverError();
    }
  }
}

module.exports = new IssueAssignedController();

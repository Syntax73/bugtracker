const sequelize = require('../database');
const Issue = require('../models/Issue');
const IssueType = require('../models/IssueType');
const IssuePriority = require('../models/IssuePriority');
const IssueSeverity = require('../models/IssueSeverity');
const Project = require('../models/Project');
const ApiResponse = require('../helpers/apiResponse');
const { paginate, buildPagination } = require('../helpers/paginate');

class IssueController {
  async index(req, res) {
    const { project_id: projectId } = req.params;
    const { page } = req.query;
    const limit = 10;
    const http = new ApiResponse(res);

    try {
      const project = await Project.findByPk(projectId);

      if (!project) {
        return http.badResquest('Projeto não encontrado');
      }

      const issue = await Issue.findAndCountAll({
        where: { project_id: projectId },
        ...paginate(page, limit),
        include: [
          {
            association: 'reporter',
            attributes: ['name', 'email', 'avatar'],
          },
          {
            association: 'assigned',
            attributes: ['user_id'],
            separate: true,
          },
          { association: 'type', attributes: ['id', 'type'] },
          {
            association: 'priority',
            attributes: ['id', 'priority'],
            duplicating: true,
          },
          {
            association: 'severity',
            attributes: ['id', 'severity'],
            duplicating: true,
          },
        ],
      });

      return http.ok(buildPagination(issue, page, limit));
    } catch (err) {
      return http.serverError();
    }
  }

  async store(req, res) {
    const { project_id: projectId } = req.params;
    const { title, priority, description, severity, type } = req.body;
    const { id } = req.userData;
    const http = new ApiResponse(res);

    try {
      const project = await Project.findByPk(projectId);

      if (!project) {
        return http.badResquest('Projeto não encontrado');
      }

      const issue = await Issue.create(
        {
          project_id: projectId,
          user_id: id,
          title,
          description,
          type: [{ type }],
          priority: [{ priority }],
          severity: [{ severity }],
        },
        {
          include: [
            { association: 'type' },
            { association: 'priority' },
            { association: 'severity' },
          ],
        }
      );

      return http.created(issue);
    } catch (err) {
      console.log(err);
      return http.serverError();
    }
  }

  async show(req, res) {
    const { issue_id: issueId } = req.params;
    const http = new ApiResponse(res);

    try {
      const issue = await Issue.findByPk(issueId, {
        include: [
          {
            association: 'reporter',
            attributes: ['name', 'email', 'avatar_url'],
          },
          {
            association: 'assigned',
            attributes: ['user_id'],
          },
          { association: 'type', attributes: ['id', 'type'] },
          { association: 'priority', attributes: ['id', 'priority'] },
          { association: 'severity', attributes: ['id', 'severity'] },
        ],
      });

      if (!issue) {
        return http.badResquest('Projeto não encontrado');
      }

      return http.ok(issue);
    } catch (err) {
      return http.serverError();
    }
  }

  async update(req, res) {
    const { issue_id: issueId } = req.params;
    const { title, priority, description, severity, status, type } = req.body;
    const { id } = req.userData;
    const http = new ApiResponse(res);

    try {
      const reqIssue = await Issue.findByPk(issueId, {
        include: [
          {
            association: 'reporter',
            attributes: ['name', 'email', 'avatar_url'],
          },
          { association: 'type' },
          { association: 'priority' },
          { association: 'severity' },
        ],
      });

      if (!reqIssue) {
        return http.badResquest('Issue não encontrado');
      }

      if (reqIssue.user_id !== id) {
        return http.unauthorized('Issue pertence a outro usuário');
      }

      await sequelize.transaction(async (transaction) => {
        const reqType = await IssueType.findByPk(reqIssue.type.id);
        const newType = type.type;
        await reqType.update(
          { issue_id: issueId, type: newType },
          { transaction }
        );

        const reqPriority = await IssuePriority.findByPk(reqIssue.priority.id);
        const newPriority = priority.priority;
        await reqPriority.update(
          { issue_id: issueId, priority: newPriority },
          { transaction }
        );

        const reqSeverity = await IssueSeverity.findByPk(reqIssue.severity.id);
        const newSeverity = severity.severity;
        await reqSeverity.update(
          { issue_id: issueId, severity: newSeverity },
          { transaction }
        );

        await reqIssue.update(
          { user_id: id, title, description, status },
          { transaction }
        );
      });

      const response = await reqIssue.reload();
      return http.ok(response);
    } catch (err) {
      return http.serverError();
    }
  }

  async listMyIssues(req, res) {
    const { id } = req.userData;
    const { page } = req.query;
    const limit = 10;
    const http = new ApiResponse(res);

    try {
      const issue = await Issue.findAndCountAll({
        where: { user_id: id },
        ...paginate(page, limit),
        include: [
          {
            association: 'reporter',
            attributes: ['name', 'email', 'avatar'],
          },
          {
            association: 'assigned',
            attributes: ['user_id'],
            separate: true,
          },
          { association: 'type', attributes: ['id', 'type'] },
          {
            association: 'priority',
            attributes: ['id', 'priority'],
            duplicating: true,
          },
          {
            association: 'severity',
            attributes: ['id', 'severity'],
            duplicating: true,
          },
        ],
      });

      return http.ok(buildPagination(issue, page, limit));
    } catch (err) {
      return http.serverError();
    }
  }
}

module.exports = new IssueController();

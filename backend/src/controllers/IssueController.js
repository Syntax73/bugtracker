const sequelize = require('../database');
const Issue = require('../models/Issue');
const IssueType = require('../models/IssueType');
const IssuePriority = require('../models/IssuePriority');
const IssueSeverity = require('../models/IssueSeverity');
const Project = require('../models/Project');
const { paginate, buildPagination } = require('../config/paginate');

class IssueController {
  async index(req, res) {
    const { project_id: projectId } = req.params;
    const { page } = req.query;
    const limit = 6;

    const project = await Project.findByPk(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Projeto não encontrado' });
    }

    const issue = await Issue.findAndCountAll({
      where: { project_id: projectId },
      ...paginate(page, limit),
      include: [
        {
          association: 'reporter',
          attributes: ['name', 'email', 'avatar_url'],
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

    return res.json(buildPagination(issue, page, limit));
  }

  async store(req, res) {
    const { project_id: projectId } = req.params;
    const { title, priority, description, severity, type } = req.body;
    const { id } = req.userData;

    const project = await Project.findByPk(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Projeto não encontrado' });
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

    return res.status(201).json(issue);
  }

  async show(req, res) {
    const { issue_id: issueId } = req.params;

    const issue = await Issue.findByPk(issueId, {
      include: [
        {
          association: 'reporter',
          attributes: ['name', 'email', 'avatar_url'],
        },
        { association: 'type', attributes: ['id', 'type'] },
        { association: 'priority', attributes: ['id', 'priority'] },
        { association: 'severity', attributes: ['id', 'severity'] },
      ],
    });

    if (!issue) {
      return res.status(404).json({ message: 'Issue não encontrado' });
    }

    return res.json(issue);
  }

  // TODO essa função não funciona de forma correta
  async update(req, res) {
    const { project_id: projectId, issue_id: issueId } = req.params;
    const { title, priority, description, severity, status, type } = req.body;
    const { id } = req.userData;

    const project = await Project.findByPk(projectId);
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

    if (!project || !reqIssue) {
      return res.status(404).json({ message: 'Projeto/Issue não encontrado' });
    }

    await sequelize.transaction(async (transaction) => {
      if (reqIssue.type) {
        const reqType = await IssueType.findByPk(reqIssue.type.id);
        await reqType.update({ issue_id: issueId, type }, { transaction });
      }
      await IssueType.create({ issue_id: issueId, type }, { transaction });

      if (reqIssue.priority) {
        const reqPriority = await IssuePriority.findByPk(reqIssue.priority.id);
        await reqPriority.update(
          { issue_id: issueId, priority },
          { transaction }
        );
      }
      await IssuePriority.create(
        { issue_id: issueId, priority },
        { transaction }
      );

      if (reqIssue.severity) {
        const reqSeverity = await IssueSeverity.findByPk(reqIssue.severity.id);
        await reqSeverity.update(
          { issue_id: issueId, severity },
          { transaction }
        );
      }
      await IssueSeverity.create(
        { issue_id: issueId, severity },
        { transaction }
      );

      await reqIssue.update(
        { user_id: id, title, description, status },
        { transaction }
      );
    });

    const reIssue = await reqIssue.reload();

    return res.json(reIssue);
  }
}

module.exports = new IssueController();

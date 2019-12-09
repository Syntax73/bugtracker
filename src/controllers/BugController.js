const sequelize = require('../database');
const Bug = require('../models/Bug');
const BugPriority = require('../models/BugPriority');
const BugSeverity = require('../models/BugSeverity');
const Project = require('../models/Project');

class BugController {
  async index(req, res) {
    const { project_id: projectId } = req.params;

    const project = await Project.findByPk(projectId, {
      include: {
        association: 'bugs',
        include: [
          {
            association: 'reporter',
            attributes: ['name', 'email', 'avatar_url'],
          },
          { association: 'priority', attributes: ['id', 'priority'] },
          { association: 'severity', attributes: ['id', 'severity'] },
        ],
      },
    });

    if (!project) {
      return res.status(404).json({ message: 'Projeto não encontrado' });
    }

    return res.json(project.bugs);
  }

  async store(req, res) {
    const { project_id: projectId } = req.params;
    const { title, priority, description, severity } = req.body;
    const { id } = req.userData;

    const project = await Project.findByPk(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Projeto não encontrado' });
    }

    const bug = await Bug.create(
      {
        project_id: projectId,
        user_id: id,
        title,
        description,
        priority: [{ priority }],
        severity: [{ severity }],
      },
      {
        include: [{ association: 'priority' }, { association: 'severity' }],
      }
    );

    return res.status(201).json(bug);
  }

  async show(req, res) {
    const { bug_id: bugId } = req.params;

    const bug = await Bug.findByPk(bugId, {
      include: [
        {
          association: 'reporter',
          attributes: ['name', 'email', 'avatar_url'],
        },
        { association: 'priority', attributes: ['priority'] },
        { association: 'severity', attributes: ['severity'] },
      ],
    });

    if (!bug) {
      return res.status(404).json({ message: 'Bug não encontrado' });
    }

    return res.json(bug);
  }

  async update(req, res) {
    const { project_id: projectId, bug_id: bugId } = req.params;
    const { title, priority, description, severity, status } = req.body;
    const { id } = req.userData;

    const project = await Project.findByPk(projectId);
    const reqBug = await Bug.findByPk(bugId, {
      include: [
        {
          association: 'reporter',
          attributes: ['name', 'email', 'avatar_url'],
        },
        { association: 'priority' },
        { association: 'severity' },
      ],
    });

    if (!project || !reqBug) {
      return res.status(404).json({ message: 'Projeto/Bug não encontrado' });
    }

    await sequelize.transaction(async transaction => {
      if (reqBug.priority) {
        const reqPriority = await BugPriority.findByPk(reqBug.priority.id);
        await reqPriority.update({ bug_id: bugId, priority }, { transaction });
      }
      await BugPriority.create({ bug_id: bugId, priority }, { transaction });

      if (reqBug.severity) {
        const reqSeverity = await BugSeverity.findByPk(reqBug.severity.id);
        await reqSeverity.update({ bug_id: bugId, severity }, { transaction });
      }
      await BugSeverity.create({ bug_id: bugId, severity }, { transaction });

      await reqBug.update(
        { user_id: id, title, description, status },
        { transaction }
      );
    });

    return res.json(reqBug);
  }
}

module.exports = new BugController();

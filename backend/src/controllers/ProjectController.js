const Project = require('../models/Project');
const sequelize = require('../database');
const ApiResponse = require('../helpers/apiResponse');
const { paginate, buildPagination } = require('../helpers/paginate');

class ProjectController {
  async index(req, res) {
    const { page } = req.query;
    const limit = 10;
    const http = new ApiResponse(res);

    try {
      const projects = await Project.findAndCountAll({
        ...paginate(page, limit),
      });

      return http.ok(buildPagination(projects, page, limit));
    } catch (err) {
      return http.serverError();
    }
  }

  async show(req, res) {
    const { id } = req.params;
    const http = new ApiResponse(res);

    try {
      const project = await Project.findByPk(id, {
        include: {
          association: 'team',
          attributes: ['id', 'avatar', 'name', 'email', 'role'],
          through: {
            attributes: [],
          },
        },
      });

      if (!project) {
        return http.badResquest('Projeto não encontrado');
      }

      return http.ok(project);
    } catch (err) {
      return http.serverError();
    }
  }

  async store(req, res) {
    const { name, description, team } = req.body;
    const http = new ApiResponse(res);

    try {
      const project = await Project.create({ name, description });

      if (team && team.length > 0) {
        project.setTeam(team);
      }

      return http.created(project);
    } catch (err) {
      return http.serverError();
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, description, team } = req.body;
    const http = new ApiResponse(res);

    try {
      const reqProject = await Project.findByPk(id);

      if (!reqProject) {
        return http.badResquest('Projeto não encontrado');
      }

      const project = await reqProject.update({ name, description });

      if (team) {
        project.setTeam(team);
      }

      return http.ok(project);
    } catch (err) {
      return http.serverError();
    }
  }

  async destroy(req, res) {
    const { id } = req.params;
    const http = new ApiResponse(res);

    try {
      const reqProject = await Project.findByPk(id);

      if (!reqProject) {
        return http.badResquest('Projeto não encontrado');
      }

      await reqProject.destroy();

      return http.noContent(res);
    } catch (err) {
      return http.serverError();
    }
  }

  async myProjects(req, res) {
    const { id } = req.userData;
    const { page } = req.query;
    const limit = 10;
    const offset = page * limit - limit;
    const http = new ApiResponse(res);

    try {
      const reqProjects = await sequelize.query(
        `
        SELECT COUNT(*) FROM project_users WHERE user_id = :user_id;

        SELECT p.id, p.name, p.description, p.created_at, p.updated_at
        FROM project_users pu INNER JOIN projects p ON p.id = pu.project_id
        WHERE user_id = :user_id OFFSET :offset FETCH FIRST :limit ROW ONLY;
      `,
        {
          type: sequelize.QueryTypes.SELECT,
          replacements: { user_id: id, limit, offset },
          raw: true,
        }
      );

      const rows = reqProjects.slice(1);
      const count = reqProjects[0];

      if (Object.keys(rows).length === 0) {
        return http.badResquest('Time não encontrado');
      }

      return http.ok(buildPagination({ rows, ...count }, page, limit));
    } catch (err) {
      return http.serverError();
    }
  }
}

module.exports = new ProjectController();

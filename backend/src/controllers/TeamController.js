const sequelize = require('../database');
const { buildPagination } = require('../config/paginate');

class TeamController {
  async index(req, res) {
    const { project_id: id } = req.params;
    const { page } = req.query;
    const limit = 3;
    const offset = page * limit - limit;

    const team = await sequelize.query(
      `
        SELECT COUNT(*) AS count FROM project_users WHERE project_id = :projectId GROUP BY project_users.project_id;

        SELECT users.id, users.name, users.avatar, users.email, users.role FROM project_users 
          LEFT JOIN users ON users.id = project_users.user_id
          WHERE project_id = :projectId OFFSET :offset FETCH FIRST :limit ROW ONLY;
      `,
      {
        type: sequelize.QueryTypes.SELECT,
        replacements: { projectId: id, limit, offset },
        raw: true,
      }
    );

    if (!team) {
      return res.status(404).json({ message: 'Time não encontrado' });
    }

    const rows = team.slice(1);
    const count = team[0];

    return res.json(buildPagination({ rows, ...count }, page, limit));
  }
}

module.exports = new TeamController();

const sequelize = require('../database');
const { buildPagination } = require('../helpers/paginate');
const ApiResponse = require('../helpers/apiResponse');

class TeamController {
  async index(req, res) {
    const { project_id: id } = req.params;
    const { page } = req.query;
    const limit = 10;
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

    const rows = team.slice(1);
    const count = team[0];

    if (Object.keys(rows).length === 0) {
      return ApiResponse.badResquest('Time não encontrado', res);
    }

    return ApiResponse.ok(
      buildPagination({ rows, ...count }, page, limit),
      res
    );
  }
}

module.exports = new TeamController();

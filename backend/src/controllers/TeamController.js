const sequelize = require('../database');

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

    return res.json(team);
  }
}

module.exports = new TeamController();

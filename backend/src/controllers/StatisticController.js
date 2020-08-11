const ApiResponse = require('../helpers/apiResponse');
const sequelize = require('../database');

class StatisticController {
  async index(req, res) {
    const http = new ApiResponse(res);
    const { id } = req.userData;

    try {
      const issuesStatistics = await sequelize.query(
        `
        SELECT DATE_TRUNC('day', created_at) as date, COUNT(1) AS issues FROM issues GROUP BY 1 ORDER BY 1 ASC;
      `,
        {
          type: sequelize.QueryTypes.SELECT,
          raw: true,
        }
      );

      const issuesStatusIstatistics = await sequelize.query(
        `
        SELECT status, COUNT(*) FROM issues GROUP BY status;
      `,
        {
          type: sequelize.QueryTypes.SELECT,
          raw: true,
        }
      );

      const userIssuesStatistics = await sequelize.query(
        `
        SELECT DATE_TRUNC('day', created_at) as date, COUNT(1) AS issues FROM issues WHERE user_id = :user_id GROUP BY 1 ORDER BY 1 ASC;
      `,
        {
          type: sequelize.QueryTypes.SELECT,
          replacements: { user_id: id },
          raw: true,
        }
      );

      return http.ok({
        issuesStatistics,
        issuesStatusIstatistics,
        userIssuesStatistics,
      });
    } catch (err) {
      return http.serverError();
    }
  }
}

module.exports = new StatisticController();

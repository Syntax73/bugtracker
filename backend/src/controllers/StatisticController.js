const ApiResponse = require('../helpers/apiResponse');
const sequelize = require('../database');

class StatisticController {
  async index(req, res) {
    const http = new ApiResponse(res);

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

      return http.ok({ issuesStatistics, issuesStatusIstatistics });
    } catch (err) {
      return http.serverError();
    }
  }
}

module.exports = new StatisticController();

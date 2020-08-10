const ApiResponse = require('../helpers/apiResponse');
const sequelize = require('../database');

class StatisticController {
  async index(req, res) {
    const http = new ApiResponse(res);

    try {
      const query = await sequelize.query(
        `
        SELECT DATE_TRUNC('day', created_at) as date, COUNT(1) AS issues FROM issues GROUP BY 1;
      `,
        {
          type: sequelize.QueryTypes.SELECT,
          raw: true,
        }
      );

      return http.ok(query);
    } catch (err) {
      return http.serverError();
    }
  }
}

module.exports = new StatisticController();

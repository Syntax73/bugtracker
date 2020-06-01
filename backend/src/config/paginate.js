module.exports = {
  paginate({ page, limit }) {
    const offset = page * limit - limit;

    return {
      offset,
      limit,
    };
  },

  // TODO essa solução não funciona com o issueController
  buildPagination(response, reqPage, reqLimit) {
    const pages = Math.ceil(response.count / reqLimit);
    const page = parseInt(reqPage, 10);
    const limit = parseInt(reqLimit, 10);
    return { data: response.rows, page, pages, limit };
  },
};

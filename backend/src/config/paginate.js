module.exports = {
  paginate(page = 1, limit) {
    const offset = page * limit - limit;

    return {
      offset,
      limit,
    };
  },

  buildPagination(response, reqPage, reqLimit) {
    const pages = Math.ceil(response.count / reqLimit);
    const page = parseInt(reqPage, 10);
    const limit = reqLimit;
    return { data: response.rows, count: response.count, page, pages, limit };
  },
};

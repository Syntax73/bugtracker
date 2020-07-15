class ApiResponse {
  ok(payload, res) {
    return res.status(200).json({
      status: 200,
      data: payload,
    });
  }

  created(payload, res) {
    return res.status(201).json({
      status: 201,
      data: payload,
    });
  }

  noContent(res) {
    return res.status(204).send();
  }

  badResquest(msg, res) {
    return res.status(400).json({
      status: 400,
      message: msg,
    });
  }

  unauthorized(msg, res) {
    return res.status(401).json({
      status: 401,
      message: msg,
    });
  }
}

module.exports = new ApiResponse();

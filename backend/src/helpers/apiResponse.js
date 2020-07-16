class ApiResponse {
  constructor(response) {
    this.response = response;
  }

  ok(payload) {
    return this.response.status(200).json({
      status: 200,
      data: payload,
    });
  }

  created(payload) {
    return this.response.status(201).json({
      status: 201,
      data: payload,
    });
  }

  noContent() {
    return this.response.status(204).send();
  }

  badResquest(msg) {
    return this.response.status(400).json({
      status: 400,
      message: msg,
    });
  }

  unauthorized(msg) {
    return this.response.status(401).json({
      status: 401,
      message: msg,
    });
  }

  serverError() {
    return this.response.status(500).json({
      status: 500,
      message: 'Error interno do servidor',
    });
  }
}

module.exports = ApiResponse;

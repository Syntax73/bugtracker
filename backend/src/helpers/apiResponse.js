class ApiResponse {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

  static badResquest(msg) {
    return new ApiResponse(400, msg);
  }

  static unauthorized(msg) {
    return new ApiResponse(401, msg);
  }
}

module.exports = ApiResponse;

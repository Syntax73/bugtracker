const express = require('express');
const routes = require('./routes');
require('../src/database');

class AppController {
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use(routes);
  }
}

module.exports = new AppController().express;

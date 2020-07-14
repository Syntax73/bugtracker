const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const apiErrorHandler = require('./middlewares/apiErrorHandler');
require('./database');

class AppController {
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(cors());
  }

  routes() {
    this.express.use(routes);
    this.express.use(apiErrorHandler);
  }
}

module.exports = new AppController().express;

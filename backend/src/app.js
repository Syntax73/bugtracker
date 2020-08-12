const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
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
    this.express.use(cookieParser());
  }

  routes() {
    this.express.use(routes);
  }
}

module.exports = new AppController().express;

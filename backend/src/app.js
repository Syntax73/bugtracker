const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsConfig = require('./config/cors');
const routes = require('./routes');
require('./database');

class AppController {
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.express.use(cors(corsConfig));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(cookieParser());
  }

  routes() {
    this.express.use(routes);
  }
}

module.exports = new AppController().express;

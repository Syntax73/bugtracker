const Sequelize = require('sequelize');
const dbConnection = require('../config/database');

const User = require('../models/User');

const connection = new Sequelize(dbConnection);

User.init(connection);

module.exports = connection;

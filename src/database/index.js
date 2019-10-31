const Sequelize = require('sequelize');
const dbConnection = require('../config/database');

const connection = new Sequelize(dbConnection);

module.exports = connection;

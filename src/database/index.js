const Sequelize = require('sequelize');
const dbConnection = require('../config/database');

const User = require('../models/User');
const Project = require('../models/Project');

const connection = new Sequelize(dbConnection);

User.init(connection);
Project.init(connection);

User.associate(connection.models);
Project.associate(connection.models);

module.exports = connection;

const Sequelize = require('sequelize');
const dbConnection = require('../config/database');

const User = require('../models/User');
const Project = require('../models/Project');
const Bug = require('../models/Bug');
const BugAssigned = require('../models/BugAssigned');
const BugPriority = require('../models/BugPriority');
const BugSeverity = require('../models/BugSeverity');

const connection = new Sequelize(dbConnection);

User.init(connection);
Project.init(connection);
Bug.init(connection);
BugAssigned.init(connection);
BugPriority.init(connection);
BugSeverity.init(connection);

User.associate(connection.models);
Project.associate(connection.models);
Bug.associate(connection.models);
BugAssigned.associate(connection.models);
BugPriority.associate(connection.models);
BugSeverity.associate(connection.models);

module.exports = connection;

const Sequelize = require('sequelize');
const dbConnection = require('../config/database');

const User = require('../models/User');
const Project = require('../models/Project');
const Issue = require('../models/Issue');
const IssueAssigned = require('../models/IssueAssigned');
const IssuePriority = require('../models/IssuePriority');
const IssueSeverity = require('../models/IssueSeverity');
const IssueComment = require('../models/IssueComment');
const IssueType = require('../models/IssueType');

const connection = new Sequelize(dbConnection);

User.init(connection);
Project.init(connection);
Issue.init(connection);
IssueAssigned.init(connection);
IssuePriority.init(connection);
IssueSeverity.init(connection);
IssueComment.init(connection);
IssueType.init(connection);

User.associate(connection.models);
Project.associate(connection.models);
Issue.associate(connection.models);
IssueAssigned.associate(connection.models);
IssuePriority.associate(connection.models);
IssueSeverity.associate(connection.models);
IssueComment.associate(connection.models);
IssueType.associate(connection.models);

module.exports = connection;

const routes = require('express').Router();

const sessionRoute = require('./session');
const filesRoute = require('./files');
const userRoute = require('./user');
const projectRoute = require('./project');
const teamRoute = require('./team');
const issueRoute = require('./issue');
const issueAssignedRoute = require('./assigned');
const issueCommentRoute = require('./comment');

routes.use(sessionRoute);
routes.use(filesRoute);
routes.use('/users', userRoute);
routes.use('/projects', projectRoute);
routes.use(teamRoute);
routes.use(issueRoute);
routes.use(issueAssignedRoute);
routes.use(issueCommentRoute);

module.exports = routes;

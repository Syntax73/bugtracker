const routes = require('express').Router();
const isAuth = require('../middlewares/isAuth');
const TeamController = require('../controllers/TeamController');

routes.get('/projects/:project_id/team', isAuth, TeamController.index);

module.exports = routes;

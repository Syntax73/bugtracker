const routes = require('express').Router();
const isAuth = require('../middlewares/isAuth');
const StatisticController = require('../controllers/StatisticController');

routes.get('/', isAuth, StatisticController.index);

module.exports = routes;

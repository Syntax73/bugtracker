const routes = require('express').Router();
const isAuth = require('./middlewares/isAuth');
const isAdmin = require('./middlewares/isAdmin');

const SessionController = require('./controllers/SessionController');
const UserController = require('./controllers/UserController');

routes.post('/session', SessionController.store);

routes.get('/users', isAuth, isAdmin(true), UserController.index);
routes.get('/users/:id', isAuth, isAdmin(true), UserController.show);
routes.post('/users', isAuth, isAdmin(true), UserController.store);
routes.put('/users/:id', isAuth, isAdmin(true), UserController.update);

module.exports = routes;

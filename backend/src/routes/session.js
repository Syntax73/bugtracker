const routes = require('express').Router();
const SessionController = require('../controllers/SessionController');
const validateDto = require('../middlewares/validateDto');

const { sessionDto } = require('../dto');

routes.post('/session', validateDto(sessionDto), SessionController.store);
routes.post('/validate-session', SessionController.validateSession);

module.exports = routes;

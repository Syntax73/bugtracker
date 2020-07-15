const routes = require('express').Router();
const FileController = require('../controllers/FileController');

routes.get('/files/:file', FileController.show);

module.exports = routes;

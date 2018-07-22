const express = require('express');
const bodyParser = require('body-parser');
const expressjwt = require('express-jwt');
const conf = require('../config/config.js');
const _ = require('lodash');
const CryptSolution = require('../../challenges/isCryptSolution/CryptSolution');

module.exports = function () {
  const apiRoutes = express.Router();

  apiRoutes.use(bodyParser.urlencoded({extended: true}));
  apiRoutes.use(bodyParser.json());

  const authenticateToken = expressjwt({
    secret: conf.get('authentication.jsonwebtoken.secret'),
    getToken: (req) => {
      return _.get(req, 'session.apiToken');
    }
  });
  apiRoutes.use('/', authenticateToken);

  apiRoutes.get('/', (req, res, next) => {
    res.json({'hello': 'api'}).end();
  });

  apiRoutes.get('/run/cryptSolution', (req, res, next) => {

    CryptSolution.run((error, result) => {
      res.json(result).end();
    });
  });
  return apiRoutes;
};

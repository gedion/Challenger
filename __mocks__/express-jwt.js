'use strict';

const _ = require('lodash');
module.exports = function (options) {
  var middleware = function(req, res, next) {
    next();
  };
return middleware;
}

const jwt = require('jsonwebtoken');
const _ = require('lodash');
const path = require('path');

class LandingPage {
  constructor (conf) {
    this.conf = conf;
    this.handleViewObqRequest = this.handleViewObqRequest.bind(this);
    this.handleUnAuthorizedReqeusts = this.handleUnAuthorizedReqeusts.bind(this);
  }

  buildSession () {
    let secret = this.conf.get('authentication.jsonwebtoken.secret');
    return {
      secret: secret,
      cookie: {
        secure: true
      }
    };
  }

  buildToken (user) {
    let secret = this.conf.get('authentication.jsonwebtoken.secret');
    let tokenExpirationDate = this.conf.get('authentication.jsonwebtoken.expiresIn');
    let token = jwt.sign({ user: user.userid }, secret, {
      expiresIn: tokenExpirationDate
    });
    return token;
  }

  handleUnAuthorizedReqeusts (error, request, response, next) {
    let result = 'Unexpected error occured';
    if (error.name === 'UnauthorizedError') {
      result = `Warning: Either your session has expired or you're Unauthorized.
      Reload the page to refresh your session.`;
    } else {
      console.error(error);
    }
    response.status(401)
      .send(result)
      .end();
  }

  handleMiscRequest () {
    return _.bind((request, response, next) => {
      console.log('Request: [GET]', request.originalUrl);
      response.sendFile(path.resolve(__dirname, 'index.html'));
      next();
    }, this);
  }

  handleViewObqRequest (request, response, next) {
    let user = _.get(request, 'session.user');

    if (!_.isObject(user)) {
      next({name: 'UnauthorizedError'});
    } else {
      let title = this.conf.get('ui.settings.title');
      let appInit = {
        title
      };
      response.render('main_jade', this.buildHttpResponse(title, user, appInit));
    }
  }

  buildHttpResponse (title, user, appInit) {
    return {
      title: title,
      user: JSON.stringify(user),
      cssCommon: user.cssCommon,
      appInit: JSON.stringify(appInit),
    };
  }

}

module.exports = LandingPage;

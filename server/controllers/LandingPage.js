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

  getCodeCards () {
    return [{
      category: 'Programming Blogs',
      title: 'PG1: A'
    }, {
      category: 'Programming Blogs',
      title: 'PG1: B'
    }, {
      category: 'Programming Blogs',
      title: 'PG1: C'
    }, {
      category: 'Code Fight Challenge',
      title: 'Fight: Arrays'
    }, {
      category: 'Code Fight Challenge',
      title: 'Fight: Strings'
    }, {
      category: 'Daily Summary',
      title: 'Day 1'
    }, {
      category: 'Daily Summary',
      title: 'Day 2'
    }, {
      category: 'Daily Summary',
      title: 'Day 3'
    }];
  }

  handleViewObqRequest (request, response, next) {
    let user = _.get(request, 'session.user') || {
      id: 1,
      cssCommon: ''
    };
    request.session.user = user;
    request.session.apiToken = this.buildToken(user);
    if (!_.isObject(user)) {
      next({name: 'UnauthorizedError'});
    } else {
      let title = this.conf.get('ui.settings.title');
      let codeCards = this.getCodeCards();
      let appInit = {
        title,
        runResults: [],
        showCodeDrawer: false,
        showProgressBar: false,
        selectedCodeDrawerItem: 'Programming Blogs',
        codeCategories: [{
          caption: 'Programming Blogs',
          legend: 'July 21, 2018'
        }, {
          caption: 'Code Fight Challenge',
          legend: 'July 21, 2018'
        }, {
          caption: 'Daily Summary',
          legend: 'July 21, 2018'
        }],
        codeCards: codeCards,
        selectedCodeCards: _.filter(codeCards, { category: 'Programming Blogs' })
      };
      response.render('main_jade', this.buildHttpResponse(title, user, appInit));
    }
  }

  buildHttpResponse (title, user, appInit) {
    return {
      title: title,
      user: JSON.stringify(user),
      cssCommon: user.cssCommon,
      appInit: JSON.stringify(appInit)
    };
  }

}

module.exports = LandingPage;

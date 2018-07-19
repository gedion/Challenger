const express = require('express');
const session = require('express-session');
const https = require('https');
const path = require('path');
const conf = require('./config/config.js');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const historyApiFallback = require('connect-history-api-fallback');
const app = express();
const jade = require('jade');
const ControllerLandingPage = require('./controllers/LandingPage');
const passport = require('passport');
const apiRoute = require('./api/routes.js')();

let controllerLandingPage = new ControllerLandingPage(conf);

app.set('views', 'client/views');
app.set('view engine', 'jade');
app.engine('jade', jade.__express);
app.use(morgan('combined')); // Using morgan for request logging.

// Without this, SAML loops endlessly. Might be required for other functionality, too.
app.use(bodyParser.urlencoded({extended: true}));
app.set('trust proxy', 1);
app.use(session(controllerLandingPage.buildSession()));

app.use(passport.initialize());

app.use('/api/', apiRoute);
// app.get('/', passportAuthLTI, controllerLandingPag.handleViewObqRequest);
 /**
  * replace above line with this during development
  * to run this directly from the browser w/o lti dependency
  * because it is difficult to debug react/redux in
  * iframes
  */
app.all('/', controllerLandingPage.handleViewObqRequest);

app.use(historyApiFallback());
app.use(controllerLandingPage.handleUnAuthorizedReqeusts);
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, '../coverage')));

app.get('*', controllerLandingPage.handleMiscRequest());
const port = conf.get('https.port');
const server = https.createServer(conf.get('https.sslOptions'), app).listen(port);
console.log(`Listening on ${port}`);
module.exports = { server: server, app: app };

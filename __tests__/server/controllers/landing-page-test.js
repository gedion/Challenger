
'use strict';

const _ = require('lodash');

const conf = require('../../../server/config/config');
const ControllerLandingPage = require('../../../server/controllers/LandingPage');
let controllerLandingPage = new ControllerLandingPage(conf);

import fs from 'fs';
import path from 'path';
let initAppState = fs.readFileSync(path.join(__dirname, '../../../fixtures/init-app-state.json'), 'utf8');
initAppState = JSON.parse(initAppState);

describe('Tests server landing page controller', () => {
  let request;
  let response;
  let next;

  beforeEach(() => {
    let sendFile = jest.fn();
    let status = jest.fn();
    let send = jest.fn();
    let end = jest.fn();
    let render = jest.fn();
    response = {
      sendFile,
      status,
      send,
      end,
      render
    }
    sendFile.mockImplementation(() => response);
    status.mockImplementation(() => response);
    send.mockImplementation(() => response);
    end.mockImplementation(() => response);
    render.mockImplementation(() => response);
    request = {
      originalUrl: '',
      session: {
        user: {
          userid: 1,
          cssCommon: ''
        }
      }
    }
    next = jest.fn();
  })

  it('should build a session object', () => {
    let session = controllerLandingPage.buildSession();
    expect(session).toEqual({
      secret: 'secret',
      cookie: {
        secure: true
      }
    });
  });

  it('should build a token to be used on the client side for api calls ', () => {
    let user = {
      userid: 1
    }
    let token = controllerLandingPage.buildToken(user);
    expect(token).toEqual(expect.any(String));
  });

  it('should build init application UI response object', () => {
    let title = 'My Test application';
    let user = {
      userid: 1,
      cssCommon: ''
    }
    var appInit = {};
    let session = controllerLandingPage.buildHttpResponse(title, user, appInit);
    expect(session).toEqual({
      title: title,
      user: "{\"userid\":1,\"cssCommon\":\"\"}",
      cssCommon: '',
      appInit: '{}'
    });
  });

  it('should verify index.html was sent as file for none-landing page requests', () => {
    controllerLandingPage.handleMiscRequest()(request, response, next);
    expect(response.sendFile.mock.calls.length).toEqual(1);
    expect(next.mock.calls.length).toEqual(1);
  });

  it('should verify the http response status is set to 401 in unauthrized requests', () => {
    let error = {
      name: 'UnauthorizedError'
    }
    controllerLandingPage.handleUnAuthorizedReqeusts(error, request, response, next);
    expect(response.status.mock.calls[0][0]).toEqual(401);
    expect(response.send.mock.calls[0][0]).toEqual(`Warning: Either your session has expired or you're Unauthorized.
      Reload the page to refresh your session.`);
    expect(response.end.mock.calls.length).toEqual(1);
  });

  it('should return 401 for errors other than Unauthorized requests', () => {
    let error = {
      name: 'UnknownError'
    }
    controllerLandingPage.handleUnAuthorizedReqeusts(error, request, response, next);
    expect(response.status.mock.calls[0][0]).toEqual(401);
    expect(response.send.mock.calls[0][0]).toEqual('Unexpected error occured');
    expect(response.end.mock.calls.length).toEqual(1);
  });

  it('should call next with UnauthorizedError requests since the user object is not set properly in the session', () => {
    request.session.user = 'none-object user';
    controllerLandingPage.handleViewObqRequest(request, response, next);
    expect(next.mock.calls[0][0]).toEqual({name: 'UnauthorizedError'});
    expect(response.render.mock.calls.length).toEqual(0);
  });

  it('should pass the proper app init data for jade to render the landing page since we have a proper user object in the session', () => {
    controllerLandingPage.handleViewObqRequest(request, response, next);
    expect(response.render.mock.calls[0][0]).toEqual('main_jade');
    expect(response.render.mock.calls[0][1]).toEqual({
      title : 'Hello World',
      user: "{\"userid\":1,\"cssCommon\":\"\"}",
      cssCommon: '',
      appInit: JSON.stringify(initAppState)
    });
    expect(next.mock.calls.length).toEqual(0);
  });
});

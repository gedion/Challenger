'use strict';

const _ = require('lodash');
const request = require('supertest');
const server = require('../../../server/server');
const conf = require('../../../server/config/config.js');
const ControllerLandingPage = require('../../../server/controllers/LandingPage');
let controllerLandingPage = new ControllerLandingPage(conf);

describe('Tests server APIs', () => {

  afterAll(() => {
    server.server.close();
  });

  it('should receive a hello api response', (done) => {
    request(server.app)
      .get('/api/')
      .send()
      .end((error, response) => {
        expect(error).toBeNull();
        expect(response.body).toEqual({
          'hello': 'api'
        });
        done();
      });
  });
});

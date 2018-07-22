'use strict';

const request = require('supertest');
const server = require('../../../server/server');

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

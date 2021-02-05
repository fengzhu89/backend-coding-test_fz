'use strict';

const request = require('supertest');
// const { expect } = require('chai');
const app = require('../src/app')();
const DB = require("../src/db")
describe('API tests', () => {
    describe('GET /rides', () => {
        afterEach(() => {
            if (DB.allAsync.restore) {
              DB.allAsync.restore();
            }
          });
        it('should respond 200', function(done) {
            request(app)
              .get('/rides')
              .expect(200,done)
          });
    });

})
'use strict';

const request = require('supertest');
// const { expect } = require('chai');
const app = require('../src/app')();
const DB = require("../src/db")
describe('API tests', () => {
    describe('GET /rides/:id', () => {
        it('should return 200 status', (done) => {
            request(app)
                .get('/rides/1')
                .expect(200, done);
        });
    });
})
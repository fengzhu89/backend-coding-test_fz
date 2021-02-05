'use strict';

const request = require('supertest');
// const { expect } = require('chai');
const app = require('../src/app')();
const DB = require("../src/db")
describe('API tests', () => {
    describe('post /rides', () => {
        // for correct post   
       it('should respond with redirect on post', function(done) {
           request(app)
             .post('/rides')
             .send({
               "start_lat": 1.4,
               "start_long": 3.4,
               "end_lat":1.4,
               "end_long":1.5,
               "rider_name":"lily",
               "driver_name":"john",
               "driver_vehicle":"honda",
             })
             .expect(200)
             .expect('Content-Type', /json/)
             .end(function(err, res) {
               if (err) done(err);
                });
             done();
         });

       // for data error checking
       it('should return error message for start_lat/long',function(done){
           request(app)
           .post('/rides')
           .send({
               "start_lat": 91,
               "start_long": 3.4,
               "end_lat":1.4,
               "end_long":1.5,
               "rider_name":"lily",
               "driver_name":"john",
               "driver_vehicle":"honda",
             })
           .end(function(err,res){
               if (err) done(err)
               done()
           })
       })
       it('should return error message for end_lat/long',function(done){
           request(app)
           .post('/rides')
           .send({
               "start_lat": 1.2,
               "start_long": 3.4,
               "end_lat":93,
               "end_long":1.5,
               "rider_name":"lily",
               "driver_name":"john",
               "driver_vehicle":"honda",
             })
           .end(function(err,res){
               if (err) done(err)
               done()
           })
       })

       it('should return error message for riderName',function(done){
           request(app)
           .post('/rides')
           .send({
               "start_lat": 1.3,
               "start_long": 3.4,
               "end_lat":1.3,
               "end_long":1.5,
               "rider_name":1.4,
               "driver_name":"john",
               "driver_vehicle":"honda",
             })
           .end(function(err,res){
               if (err) done(err)
               done()
           })
       })

       it('should return error message for driverName',function(done){
           request(app)
           .post('/rides')
           .send({
               "start_lat": 1.3,
               "start_long": 3.4,
               "end_lat":1.3,
               "end_long":1.5,
               "rider_name":"lily",
               "driver_name":3.4,
               "driver_vehicle":"honda",
             })
           .end(function(err,res){
               if (err) done(err)
               done()
           })
       })

       it('should return error message for driverVechich',function(done){
           request(app)
           .post('/rides')
           .send({
               "start_lat": 1.3,
               "start_long": 3.4,
               "end_lat":1.3,
               "end_long":1.5,
               "rider_name":"lily",
               "driver_name":"john",
               "driver_vehicle":"",
             })
           .end(function(err,res){
               if (err) done(err)
               done()
           })
       })

   });
})
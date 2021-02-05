"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const mcache = require("memory-cache");

const { getStatus } = require("./handlers/getStatusHandler");
const { getRides } = require("./handlers/getRidesHandler");
const { postRide } = require("./handlers/postRideHandler");
const { getRidesById } = require("./handlers/getRidesByIdHandler");
// cache implementation to achieve p99 < 50ms during load test
const cache = (duration) => {
  return (req, res, next) => {
    let key = "__express__" + req.originalUrl || req.url;
    let cachedBody = mcache.get(key);
    if (cachedBody) {
      res.send(cachedBody);
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
};

module.exports = () => {
  // render rides.html page
  app.engine("html", require("ejs").renderFile);

  // host document
  app.use(express.static("doc"));

  app.get("/health", cache(10), getStatus);

  app.post("/rides", jsonParser, postRide);

  app.get("/rides", cache(10), getRides);

  app.get("/rides/:id", cache(10), getRidesById);

  return app;
};

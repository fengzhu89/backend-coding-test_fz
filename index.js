"use strict";

// const express = require("express");
const { db } = require("./src/db");
const app = require("./src/app")();
const port = 8010;

const path = require("path");
const fs = require("fs");
const https = require("https");
const httpsPort = 8081;

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

// const sqlite3 = require("sqlite3").verbose();
// const db = new sqlite3.Database(":memory:");

const buildSchemas = require("./src/schemas");
const logger = require("./config/logger");
const { fstat } = require("fs");

db.serialize(() => {
  buildSchemas(db);

  //const app = require("./src/app")(db);
  // http
  app.listen(port, () =>
    logger.log("info", `App started and listening on port ${port}`)
  );

  const httpsOptions = {
    cert: fs.readFileSync("./ssl/server.crt"),
    key: fs.readFileSync("./ssl/server.key"),
  };

  https.createServer(httpsOptions, app).listen(httpsPort, () => {
    logger.log("info", `HTTPS App started and listening on port ${httpsPort}`);
    console.log(`HTTPS App started and listening on port ${httpsPort}`);
  });
});

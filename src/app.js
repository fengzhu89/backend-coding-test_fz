"use strict";

const express = require("express");
const app = express();
const logger = require("../config/logger");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const path = require("path");

module.exports = (db) => {
  // sqlite3 does not support async/await then need to create an async function with a promise
  async function db_all(query) {
    return new Promise(function (resolve, reject) {
      db.all(query, function (err, rows) {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }

  async function db_one(query, params) {
    return new Promise(function (resolve, reject) {
      db.all(query, params, function (err, rows) {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }

  async function db_run(query, params) {
    return new Promise(function (resolve, reject) {
      db.run(query, params, function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.lastID);
      });
    });
  }

  // render rides.html page
  app.engine("html", require("ejs").renderFile);

  // add host document page for task 1
  app.get("/document", function (req, res) {
    res.sendFile(path.join(__dirname, "../pages/document.html"));
  });

  app.get("/health", (req, res) => res.send("Healthy"));

  app.post("/rides", jsonParser, async (req, res) => {
    const startLatitude = Number(req.body.start_lat);
    const startLongitude = Number(req.body.start_long);
    const endLatitude = Number(req.body.end_lat);
    const endLongitude = Number(req.body.end_long);
    const riderName = req.body.rider_name;
    const driverName = req.body.driver_name;
    const driverVehicle = req.body.driver_vehicle;

    if (
      startLatitude < -90 ||
      startLatitude > 90 ||
      startLongitude < -180 ||
      startLongitude > 180
    ) {
      logger.log(
        "error",
        "Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively"
      );
      return res.send({
        error_code: "VALIDATION_ERROR",
        message:
          "Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively",
      });
    }

    if (
      endLatitude < -90 ||
      endLatitude > 90 ||
      endLongitude < -180 ||
      endLongitude > 180
    ) {
      logger.log(
        "error",
        "End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively"
      );
      return res.send({
        error_code: "VALIDATION_ERROR",
        message:
          "End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively",
      });
    }

    if (typeof riderName !== "string" || riderName.length < 1) {
      logger.log("error", "Rider name must be a non empty string");
      return res.send({
        error_code: "VALIDATION_ERROR",
        message: "Rider name must be a non empty string",
      });
    }

    if (typeof driverName !== "string" || driverName.length < 1) {
      logger.log("error", "Rider name must be a non empty string");
      return res.send({
        error_code: "VALIDATION_ERROR",
        message: "Rider name must be a non empty string",
      });
    }

    if (typeof driverVehicle !== "string" || driverVehicle.length < 1) {
      logger.log("error", "Rider Vehicle must be a non empty string");
      return res.send({
        error_code: "VALIDATION_ERROR",
        message: "Rider Vehicle must be a non empty string",
      });
    }

    var values = [
      req.body.start_lat,
      req.body.start_long,
      req.body.end_lat,
      req.body.end_long,
      req.body.rider_name,
      req.body.driver_name,
      req.body.driver_vehicle,
    ];

    try {
      var lastID = await db_run(
        "INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)",
        values
      );
      var rows = await db_one("SELECT * FROM Rides WHERE rideID = ?", lastID);
      res.send(rows);
    } catch (error) {
      logger.log("error", "SERVER_ERROR, Unknown error");
      return res.send({
        error_code: "SERVER_ERROR",
        message: "Unknown error",
      });
    }
  });

  app.get("/rides", async (req, res) => {
    try {
      var rows = await db_all("SELECT * FROM Rides");
      if (rows.length === 0) {
        logger.log("info", "Could not find any rides");
        return res.send({
          error_code: "RIDES_NOT_FOUND_ERROR",
          message: "Could not find any rides",
        });
      }
      res.render("../pages/rides.html", { msg: JSON.stringify(rows) });
    } catch (err) {
      logger.log("error", "SERVER_ERROR, Unknown error");
      return res.send({
        error_code: "SERVER_ERROR",
        message: "Unknown error",
      });
    }
  });

  app.get("/rides/:id", async (req, res) => {
    try {
      var rows = await db_one(
        "SELECT * FROM Rides WHERE rideID = ?",
        req.params.id
      );
      if (rows.length === 0) {
        logger.log("info", "Could not find any rides");
        return res.send({
          error_code: "RIDES_NOT_FOUND_ERROR",
          message: "Could not find any rides",
        });
      }
      res.send(rows);
    } catch (err) {
      logger.log("error", "SERVER_ERROR, Unknown error");
      return res.send({
        error_code: "SERVER_ERROR",
        message: "Unknown error",
      });
    }
  });
  return app;
};

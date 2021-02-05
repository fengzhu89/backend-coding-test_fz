const DB = require("../db");
const logger = require("../../config/logger");

module.exports = {
  /**
   * @api {post} /rides Add new Ride
   * @apiDescription Add new Ride
   * @apiVersion 0.0.1
   * @apiName Post Ride
   * @apiGroup Ride
   *
   * @apiParam (Body) {Number} start_lat Ride Origin Latitude
   * @apiParam (Body) {Number} start_long Ride Origin Longtitude
   * @apiParam (Body) {Number} end_lat Ride Destination Latitude
   * @apiParam (Body) {Number} end_long  Ride Destination Longtitude
   * @apiParam (Body) {String} rider_name Rider Name
   * @apiParam (Body) {String} driver_name Driver Name
   * @apiParam (Body) {String} driver_vehicle Driver Vehicle
   *
   * @apiSuccess {Object[]} rides List of Rides
   * @apiSuccess {Number} rides.rideID Rider ID
   * @apiSuccess {Number} rides.startLat Ride Origin Latitude
   * @apiSuccess {Number} rides.startLong Ride Origin Longtitude
   * @apiSuccess {Number} rides.endLat Ride Destination Latitude
   * @apiSuccess {Number} rides.endLong Ride Destination Longtitude
   * @apiSuccess {String} rides.riderName Rider Name
   * @apiSuccess {String} rides.driverName Driver Name
   * @apiSuccess {String} rides.driverVehicle Driver Vehicle
   *
   * @apiError (Error) {String} error_code Error Code
   * @apiError (Error) {String} message Error Message
   *
   * @apiSuccessExample Success-Response:
   *
   * HTTP/1.1 200
   *
   * [
   *   {
   *      rideID: '1',
   *      startLat: 1,
   *      startLong: 2,
   *      endLat: 3,
   *      endLong: 4,
   *      riderName: 'rider',
   *      driverName: 'driver',
   *      driverVehicle: 'cartype',
   *   }
   * ]
   *
   * @apiErrorExample {json} Invalid Origin Longtitude/Latitude
   *
   *  {
   *    error_code: 'VALIDATION_ERROR'
   *    message: '
   *      Start latitude & longitude must be between -90 - 90 & -180 to 180 degrees respectively
   *    '
   *  }
   *
   *  @apiErrorExample {json} Invalid Destination Longtitude/Latitude
   *
   *  {
   *    error_code: 'VALIDATION_ERROR'
   *    message: '
   *      End latitude & longitude must be between -90 - 90 & -180 to 180 degrees respectively
   *    '
   *  }
   *
   *  @apiErrorExample {json} Invalid Rider Name
   *
   *  {
   *    error_code: 'VALIDATION_ERROR'
   *    message: 'Rider name must be a non empty string
   *  }
   *
   *  @apiErrorExample {json} Invalid Driver Name
   *
   *  {
   *    error_code: 'VALIDATION_ERROR'
   *    message: 'Driver name must be a non empty string
   *  }
   *
   *  @apiErrorExample {json} Invalid Driver's Vehicle
   *
   *  {
   *    error_code: 'VALIDATION_ERROR'
   *    message: 'Vehicle type must be a non empty string
   *  }
   *
   * @apiErrorExample {json} Server Error
   *
   *  {
   *    error_code: 'SERVER_ERROR',
   *    message: 'Unknown error'
   *  }
   *
   */
  postRide: async (req, res) => {
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
      var lastID = await DB.runAsync(
        "INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)",
        values
      );
      var rows = await DB.oneAsync(
        "SELECT * FROM Rides WHERE rideID = ?",
        lastID
      );
      res.send(rows);
    } catch (error) {
      logger.log("error", "SERVER_ERROR, Unknown error");
      return res.send({
        error_code: "SERVER_ERROR",
        message: "Unknown error",
      });
    }
  },
};

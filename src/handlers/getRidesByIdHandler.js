const DB = require("../db");
const logger = require("../../config/logger");
module.exports = {
  /**
   * @api {get} /rides/:id Get a Ride data
   * @apiDescription Get a Ride data
   * @apiVersion 0.0.1
   * @apiName Get Ride
   * @apiGroup Ride
   *
   * @apiParam {Number} id Ride ID
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
   * @apiErrorExample {json} Server Error
   *
   *  {
   *    error_code: 'SERVER_ERROR'
   *    message: 'Unknown error'
   *  }
   *
   * @apiErrorExample {json} NO Data
   *
   *  {
   *    error_code: 'RIDES_NOT_FOUND_ERROR',
   *    message: 'Could not find any rides'
   *  }
   */
  getRidesById: async (req, res) => {
    try {
      var rows = await DB.oneAsync(
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
  },
};

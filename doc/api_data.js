define({ "api": [
  {
    "type": "get",
    "url": "/rides/:id",
    "title": "Get a Ride data",
    "description": "<p>Get a Ride data</p>",
    "version": "0.0.1",
    "name": "Get_Ride",
    "group": "Ride",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Ride ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "rides",
            "description": "<p>List of Rides</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rides.rideID",
            "description": "<p>Rider ID</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rides.startLat",
            "description": "<p>Ride Origin Latitude</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rides.startLong",
            "description": "<p>Ride Origin Longtitude</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rides.endLat",
            "description": "<p>Ride Destination Latitude</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rides.endLong",
            "description": "<p>Ride Destination Longtitude</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rides.riderName",
            "description": "<p>Rider Name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rides.driverName",
            "description": "<p>Driver Name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rides.driverVehicle",
            "description": "<p>Driver Vehicle</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\nHTTP/1.1 200\n\n[\n  {\n     rideID: '1',\n     startLat: 1,\n     startLong: 2,\n     endLat: 3,\n     endLong: 4,\n     riderName: 'rider',\n     driverName: 'driver',\n     driverVehicle: 'cartype',\n  }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "type": "String",
            "optional": false,
            "field": "error_code",
            "description": "<p>Error Code</p>"
          },
          {
            "group": "Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error Message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Server Error",
          "content": "\n{\n  error_code: 'SERVER_ERROR'\n  message: 'Unknown error'\n}",
          "type": "json"
        },
        {
          "title": "NO Data",
          "content": "\n{\n  error_code: 'RIDES_NOT_FOUND_ERROR',\n  message: 'Could not find any rides'\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/handlers/getRidesByIdHandler.js",
    "groupTitle": "Ride"
  },
  {
    "type": "get",
    "url": "/rides",
    "title": "Get All Rides",
    "description": "<p>Get All Rides</p>",
    "version": "0.0.1",
    "name": "Get_Rides",
    "group": "Ride",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "rides",
            "description": "<p>List of Rides</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rides.rideID",
            "description": "<p>Rider ID</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rides.startLat",
            "description": "<p>Ride Origin Latitude</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rides.startLong",
            "description": "<p>Ride Origin Longtitude</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rides.endLat",
            "description": "<p>Ride Destination Latitude</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rides.endLong",
            "description": "<p>Ride Destination Longtitude</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rides.riderName",
            "description": "<p>Rider Name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rides.driverName",
            "description": "<p>Driver Name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rides.driverVehicle",
            "description": "<p>Driver Vehicle</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\nHTTP/1.1 200\n\n[\n  {\n     rideID: '1',\n     startLat: 1,\n     startLong: 2,\n     endLat: 3,\n     endLong: 4,\n     riderName: 'rider',\n     driverName: 'driver',\n     driverVehicle: 'cartype',\n  }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "type": "String",
            "optional": false,
            "field": "error_code",
            "description": "<p>Error Code</p>"
          },
          {
            "group": "Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error Message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Server Error",
          "content": "\n{\n  error_code: 'SERVER_ERROR'\n  message: 'Unknown error'\n}",
          "type": "json"
        },
        {
          "title": "NO Data",
          "content": "\n{\n  error_code: 'RIDES_NOT_FOUND_ERROR',\n  message: 'Could not find any rides'\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/handlers/getRidesHandler.js",
    "groupTitle": "Ride"
  },
  {
    "type": "post",
    "url": "/rides",
    "title": "Add new Ride",
    "description": "<p>Add new Ride</p>",
    "version": "0.0.1",
    "name": "Post_Ride",
    "group": "Ride",
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "start_lat",
            "description": "<p>Ride Origin Latitude</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "start_long",
            "description": "<p>Ride Origin Longtitude</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "end_lat",
            "description": "<p>Ride Destination Latitude</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "end_long",
            "description": "<p>Ride Destination Longtitude</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "rider_name",
            "description": "<p>Rider Name</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "driver_name",
            "description": "<p>Driver Name</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "driver_vehicle",
            "description": "<p>Driver Vehicle</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "rides",
            "description": "<p>List of Rides</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rides.rideID",
            "description": "<p>Rider ID</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rides.startLat",
            "description": "<p>Ride Origin Latitude</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rides.startLong",
            "description": "<p>Ride Origin Longtitude</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rides.endLat",
            "description": "<p>Ride Destination Latitude</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rides.endLong",
            "description": "<p>Ride Destination Longtitude</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rides.riderName",
            "description": "<p>Rider Name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rides.driverName",
            "description": "<p>Driver Name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rides.driverVehicle",
            "description": "<p>Driver Vehicle</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\nHTTP/1.1 200\n\n[\n  {\n     rideID: '1',\n     startLat: 1,\n     startLong: 2,\n     endLat: 3,\n     endLong: 4,\n     riderName: 'rider',\n     driverName: 'driver',\n     driverVehicle: 'cartype',\n  }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "type": "String",
            "optional": false,
            "field": "error_code",
            "description": "<p>Error Code</p>"
          },
          {
            "group": "Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error Message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Invalid Origin Longtitude/Latitude",
          "content": "\n{\n  error_code: 'VALIDATION_ERROR'\n  message: '\n    Start latitude & longitude must be between -90 - 90 & -180 to 180 degrees respectively\n  '\n}",
          "type": "json"
        },
        {
          "title": "Invalid Destination Longtitude/Latitude",
          "content": "\n{\n  error_code: 'VALIDATION_ERROR'\n  message: '\n    End latitude & longitude must be between -90 - 90 & -180 to 180 degrees respectively\n  '\n}",
          "type": "json"
        },
        {
          "title": "Invalid Rider Name",
          "content": "\n{\n  error_code: 'VALIDATION_ERROR'\n  message: 'Rider name must be a non empty string\n}",
          "type": "json"
        },
        {
          "title": "Invalid Driver Name",
          "content": "\n{\n  error_code: 'VALIDATION_ERROR'\n  message: 'Driver name must be a non empty string\n}",
          "type": "json"
        },
        {
          "title": "Invalid Driver's Vehicle",
          "content": "\n{\n  error_code: 'VALIDATION_ERROR'\n  message: 'Vehicle type must be a non empty string\n}",
          "type": "json"
        },
        {
          "title": "Server Error",
          "content": "\n{\n  error_code: 'SERVER_ERROR',\n  message: 'Unknown error'\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/handlers/postRideHandler.js",
    "groupTitle": "Ride"
  },
  {
    "type": "get",
    "url": "health",
    "title": "",
    "description": "<p>Get API Status</p>",
    "version": "0.0.1",
    "name": "Health_Status",
    "group": "Status",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Message",
            "description": ""
          }
        ]
      }
    },
    "filename": "src/handlers/getStatusHandler.js",
    "groupTitle": "Status"
  }
] });

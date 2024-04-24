const assets = require("./functions/assets");
const sensors = require("./functions/sensors");
const collects = require("./functions/collects");

const routes = {
  "/assets": {
    GET: assets.GET,
    POST: assets.POST,
  },
  "/assets/{assetId}": {
    DELETE: assets.DELETE,
  },
  "/assets/{assetId}/sensors": {
    GET: sensors.GET,
    POST: sensors.POST,
  },
  "/assets/{assetId}/sensors/{sensorId}": {
    GET: collects.GET,
    POST: collects.POST,
    DELETE: sensors.DELETE,
  },
  "/assets/{assetId}/sensors/{sensorId}/{DATE}": {
    DELETE: collects.DELETE,
  },
};

module.exports = routes;

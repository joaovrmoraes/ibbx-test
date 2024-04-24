const HTTP_STATUS = require("../enums/httpStatus");
const { isNullOrEmpty } = require("../utils/isNullOrEmpty");
const { randomUUID } = require("node:crypto");
const { database } = require("../services/db");
const { handleErrors } = require("../middlewares/error");

const GET = handleErrors(async (event) => {
  const { assetId } = event.pathParameters;
  const sensors = await database.select("sensors", { assetId });

  if (sensors.length === 0) {
    return {
      statusCode: HTTP_STATUS.NOT_FOUND,
      body: JSON.stringify({ message: "sensors not found" }),
    };
  }

  return { statusCode: HTTP_STATUS.OK, body: JSON.stringify(sensors) };
});

const POST = handleErrors(async (event) => {
  const body = JSON.parse(event.body);

  if (!body) {
    return {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      body: JSON.stringify({ message: "name undefined" }),
    };
  }

  const { name } = body;

  if (isNullOrEmpty(name)) {
    return {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      body: JSON.stringify({ message: "name is null or empty" }),
    };
  }

  const { assetId } = event.pathParameters;

  const assetIdConfirmed = await database.select("assets", { id: assetId });

  if (assetIdConfirmed.length === 0) {
    return {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      body: JSON.stringify({ message: "assetId not found" }),
    };
  }

  const sensor = {
    id: randomUUID(),
    name,
    assetId,
  };

  await database.insert("sensors", sensor);

  return { statusCode: HTTP_STATUS.CREATED, body: JSON.stringify(sensor) };
});

const DELETE = handleErrors(async (event) => {
  const { sensorId } = event.pathParameters;

  const sensorIdConfirmed = await database.select("sensors", { id: sensorId });

  if (sensorIdConfirmed.length === 0) {
    return {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      body: JSON.stringify({ message: "sensorId not found" }),
    };
  }

  const dataFromSensor = await database.select("data", { sensorId });

  await Promise.all(
    dataFromSensor.map(async (data) => {
      await database.delete("data", data.id);
    })
  );

  await database.delete("sensors", sensorId);

  return { statusCode: HTTP_STATUS.NO_CONTENT };
});

module.exports = {
  GET,
  POST,
  DELETE,
};

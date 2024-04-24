const HTTP_STATUS = require("../enums/httpStatus");
const { isNullOrEmpty } = require("../utils/isNullOrEmpty");
const { randomUUID } = require("node:crypto");
const { database } = require("../services/db");
const { handleErrors } = require("../middlewares/error");
const { formatDate } = require("../utils/formatDate");

const GET = handleErrors(async (event) => {
  const { sensorId } = event.pathParameters;
  const collects = await database.select("collects", { sensorId });
  if (collects.length === 0) {
    return {
      statusCode: HTTP_STATUS.NOT_FOUND,
      body: JSON.stringify({ message: "collects not found" }),
    };
  }
  return { statusCode: HTTP_STATUS.OK, body: JSON.stringify(collects) };
});

const POST = handleErrors(async (event) => {
  const body = JSON.parse(event.body);

  if (!body) {
    return {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      body: JSON.stringify({ message: "data or value undefined" }),
    };
  }

  const { date, value } = body;

  if (isNullOrEmpty(date) || isNullOrEmpty(value)) {
    return {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      body: JSON.stringify({ message: "data or value is null or empty" }),
    };
  }

  const { sensorId } = event.pathParameters;

  const sensorIdConfirmed = await database.select("sensors", { id: sensorId });

  if (sensorIdConfirmed.length === 0) {
    return {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      body: JSON.stringify({ message: "sensorId not found" }),
    };
  }

  const formattedDate = formatDate(date);

  const collect = {
    id: randomUUID(),
    date: formattedDate,
    value,
    sensorId,
  };

  await database.insert("collects", collect);

  return { statusCode: HTTP_STATUS.CREATED, body: JSON.stringify(collect) };
});

const DELETE = handleErrors(async (event) => {
  const { DATE, sensorId } = event.pathParameters;

  const DATEConfirmed = await database.select("collects", {
    date: formatDate(DATE),
  });

  const filteredSensor = await DATEConfirmed.filter(
    (sensor) => sensor.sensorId === sensorId
  );

  if (filteredSensor.length === 0) {
    return {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      body: JSON.stringify({ message: "Sensor not found" }),
    };
  }

  await Promise.all(
    filteredSensor.map((sensor) => database.delete("collects", sensor.id))
  );

  return { statusCode: HTTP_STATUS.NO_CONTENT };
});

module.exports = {
  GET,
  POST,
  DELETE,
};

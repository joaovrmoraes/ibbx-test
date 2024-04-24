const HTTP_STATUS = require("../enums/httpStatus");
const { isNullOrEmpty } = require("../utils/isNullOrEmpty");
const { randomUUID } = require("node:crypto");
const { database } = require("../services/db");
const { handleErrors } = require("../middlewares/error");

const GET = handleErrors(async (event) => {
  const assets = await database.select("assets", null);
  return { statusCode: HTTP_STATUS.OK, body: JSON.stringify(assets) };
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

  const asset = {
    id: randomUUID(),
    name,
  };

  await database.insert("assets", asset);

  return { statusCode: HTTP_STATUS.CREATED, body: JSON.stringify(asset) };
});

const DELETE = handleErrors(async (event) => {
  const { assetId } = event.pathParameters;

  const assetIdConfirmed = await database.select("assets", { id: assetId });

  if (assetIdConfirmed.length === 0) {
    return {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      body: JSON.stringify({ message: "assetId not found" }),
    };
  }

  const sensorsInAsset = await database.select("sensors", { assetId });

  if (sensorsInAsset.length > 0) {
    return {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      body: JSON.stringify({ message: "asset have sensors" }),
    };
  }

  await database.delete("assets", assetId);

  return { statusCode: HTTP_STATUS.NO_CONTENT };
});

module.exports = {
  GET,
  POST,
  DELETE,
};

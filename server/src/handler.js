const routes = require("./routes");
const HTTP_STATUS = require("./enums/httpStatus");

module.exports.main = async (event) => {
  const [method, route] = event.routeKey.split(" ");

  let response = { statusCode: HTTP_STATUS.NOT_FOUND };

  if (routes[route] && routes[route][method]) {
    response = await routes[route][method](event);
  }

  return response;
};

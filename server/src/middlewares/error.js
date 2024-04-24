function handleErrors(handler) {
  return async function (event) {
    try {
      return await handler(event);
    } catch (error) {
      return {
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        body: JSON.stringify({ message: error.message }),
      };
    }
  };
}

module.exports = { handleErrors };

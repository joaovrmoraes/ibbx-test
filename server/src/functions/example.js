module.exports = async (event) => {
  console.log(`[example] - Received event`, JSON.stringify(event, null, 2));

  return { statusCode: 200 };
};

module.exports.config = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  };

  return {
    headers,
    statusCode: 200,
    body: JSON.stringify({
      input: event,
      config: {
        title: 'Yo',
      },
      context,
    }),
  };
};

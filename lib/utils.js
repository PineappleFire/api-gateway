module.exports.buildError = (err, statusCode) => {
  if (err.isJoi) {
    return {
      statusCode: statusCode,
      details: {
        name: err.name,
        message: err.details[0].message
      }
    };
  } else {
    return {
      statusCode: statusCode,
      details: err
    };
  }
};

module.exports.packager = ({body}, schema, {mongoDB}) => {
  return {
    body: body,
    schema: schema,
    mongoDB: mongoDB
  };
};

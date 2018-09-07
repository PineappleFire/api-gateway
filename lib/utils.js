module.exports.buildError = (err, statusCode) => {
  if (err.isJoi) {
    return {
      statusCode: statusCode,
      details: {
        name: err.name,
        message: err.details[0].message
      }
    };
  }
}

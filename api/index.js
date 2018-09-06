/*
 * Expose function to mount routes on the app
 */

module.exports = (app) => {

  // Resource not found default endpoint
  app.use('*', (req, res, next) => {
    res.status(404).json({
      error: `Requested resource ${req.originalUrl} does not exist.`
    });
  });
}

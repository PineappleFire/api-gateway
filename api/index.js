/*
 * Expose function to mount routes on the app
 */

const users = require('./users/route');

module.exports = (app) => {

  // Register users route
  app.use('/users', users);

  // Register resource not found default route
  app.use('*', (req, res) => {
    res.status(404).json({
      error: `Requested resource ${req.originalUrl} does not exist.`
    });
  });
}

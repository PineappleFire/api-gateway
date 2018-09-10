/*
 * Expose function to mount routes on the app
 */

const users = require('./users/route');
const products = require('./products/route');

module.exports = app => {

  // Register users route
  app.use('/users', users);
  app.use('/products', products);

  // Register resource not found default route
  app.use('*', (req, res) =>
    res.status(404).json({
      error: `Requested resource ${req.originalUrl} does not exist.`
    })
  );
}

/*
 * Express middleware for `users` endpoint
 *
 * Description:
 *  Handles all routing functionality for this endpoint
 */

const Router = require('express-promise-router');
const router = new Router();
const {insertNewUser} = require('./logic');

/*
 * Stub for `creating` new user account
 */
router.post('/', async (req, res) => {
  const mongoDB = req.app.locals.mongoDB;
  try {
    const id = await insertNewUser(req.body, mongoDB);
    res.status(201).json({
      id: id,
      link: `/users/${id}`
    });
  } catch (err) {
    res.status(err.statusCode).json({
      error: err.details
    });
  };
});

/*
 * Stub for `authorizing` user account
 */
router.post('/login', (req, res, next) => {
  next();
});

/*
 * Stub for `getting` account details
 */
router.get('/:id', (req, res, next) => {
  next();
});

module.exports = router;

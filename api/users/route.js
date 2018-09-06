/*
 * Express middleware for `users` endpoint
 *
 * Description:
 *  Handles all routing functionality for this endpoint
 */

const router = require('express').Router();

/*
 * Stub for `creating` new user account
 */
router.post('/', (req, res, next) => {
  next();
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

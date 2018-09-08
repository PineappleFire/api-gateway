/*
 * Express middleware for `users` endpoint
 *
 * Description:
 *  Handles all routing functionality for this endpoint
 */
const Router = require('express-promise-router');
const router = new Router();
const {insertNewUser, login} = require('./logic');

const packager = ({body}, schema, {mongoDB}) => {
  return {
    schema: schema,
    body: body,
    mongoDB: mongoDB
  };
}
/*
 * Stub for `creating` new user account
 */
router.post('/', async (req, res) => {
  const userObject = packager(req, 'user', req.app.locals)
  try {
    const id = await insertNewUser(userObject);
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
router.post('/login', async (req, res) => {
  const loginObject = packager(req, 'login', req.app.locals);
  try {
    const token = await login(loginObject);
    res.status(200).json({
      token: token
    });
  } catch (err) {
    res.status(err.statusCode).json({
      error: err.details
    });
  };
});

/*
 * Stub for `getting` account details
 */
router.get('/:id', (req, res, next) => {
  next();
});

module.exports = router;

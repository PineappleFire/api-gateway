/*
 * Express middleware for `products` endpoints
 *
 * Description:
 *  Handles routing for anything relating to products
 */
const Router = require('express-promise-router');
const router = new Router();
const {insertNewProduct} = require('./logic');
const {requireAuthentication} = require('../../lib/auth');
const {packager} = require('../../lib/utils');

router.post('/upload', requireAuthentication, async (req, res) => {
  const productObject = packager(req, 'product', req.app.locals);
  productObject.ownerId = req.userId;
  try {
    const id = await insertNewProduct(productObject);
    res.status(201).json({
      id: id,
      links: {
        productLink: `/products/${id}`,
        ownerLink: `/users/${productObject.ownerId}`
      }
    });
  } catch (err) {
    res.status(err.statusCode).json({
      error: err.details
    });
  };
});

module.exports = router;

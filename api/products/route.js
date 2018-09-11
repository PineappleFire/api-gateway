/*
 * Express middleware for `products` endpoints
 *
 * Description:
 *  Handles routing for anything relating to products
 */
const Router = require('express-promise-router');
const router = new Router();
const {insertNewProduct, getProducts} = require('./logic');
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

router.get('/:category', async (req, res) => {
  try {
    const results = await getProducts(req.query, req.params.category, req.app.locals.mongoDB);
    const {page, totalPages} = results;
    const links = {};
    
    if (page < totalPages) {
      links.nextPage = `/products/${req.params.category}?page=${page+1}`;
      links.lastPage = `/products/${req.params.category}?page=${totalPages}`;
    }
    if (page > 1) {
      links.prevPage = `/products/${req.params.category}?page=${page-1}`;
      links.firstPage = `/products/${req.params.category}?page=1`;
    }

    res.status(200).json({
      products: results.products,
      pageNumer: page,
      totalPages: totalPages,
      pageSize: results.pageSize,
      totalCount: results.totalCount,
      links: links
    });
  } catch (err) {
    res.status(err.statusCode).json({
      error: err
    });
  };
});

module.exports = router;

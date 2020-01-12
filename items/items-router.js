// const Items = require('./items-controller.js');
const router = require('express').Router();
const {
  validateItemId,
  validatePostReqBody,
  validateToken
} = require('../api/middleware.js')

// module.exports = (router) => {
  const items = require('./items-controller.js');

  // Create a new item
  router.post('/', validateToken, items.create);

  // Retrieve all items
  router.get('/', validateToken, items.findAll);

  // Retrieve a single item with itemId
  router.get('/:itemId', validateToken, items.findOne);

  // Update a item with itemId
  router.put('/:itemId', validateToken, items.update);

  // Delete a item with itemId
  router.delete('/:itemId', validateToken, items.delete);

module.exports = router;
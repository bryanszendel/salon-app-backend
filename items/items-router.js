// const Items = require('./items-controller.js');
const router = require('express').Router();
const {
  validateItemId,
  validatePostReqBody
} = require('../api/middleware.js')

// module.exports = (router) => {
  const items = require('./items-controller.js');

  // Create a new item
  router.post('/', items.create);

  // Retrieve all items
  router.get('/', items.findAll);

  // Retrieve a single item with itemId
  router.get('/:itemId', items.findOne);

  // Update a item with itemId
  router.put('/:itemId', items.update);

  // Delete a item with itemId
  router.delete('/:itemId', items.delete);

module.exports = router;
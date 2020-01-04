const router = require('express').Router();
const {
  validateItemId,
  validatePostReqBody
} = require('../api/middleware.js')

const clients = require('./clients-controller.js');

// Create a new client
router.post('/', clients.create);

// Retrieve all clients
router.get('/', clients.findAll);

// Retrieve a single client with clientId
router.get('/:clientId', clients.findOne);

// Update a client with clientId
router.put('/:clientId', clients.update);

// Delete a client with clientId
router.delete('/:clientId', clients.delete);

module.exports = router;
const router = require('express').Router();
const {
  validateItemId,
  validatePostReqBody,
  validateToken
} = require('../api/middleware.js')

const clients = require('./clients-controller.js');

// Create a new client
router.post('/', validateToken, clients.create);

// Retrieve all clients
router.get('/', validateToken, clients.findAll);

// Retrieve a single client with clientId
router.get('/:clientId', validateToken, clients.findOne);

// Update a client with clientId
router.put('/:clientId', validateToken, clients.update);

// Delete a client with clientId
router.delete('/:clientId', validateToken, clients.delete);

module.exports = router;
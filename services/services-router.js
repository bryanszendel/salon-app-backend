const router = require('express').Router();
const {
  validateItemId,
  validatePostReqBody,
  validateToken
} = require('../api/middleware.js')

const services = require('./services-controller.js');

// Create a new service
router.post('/', validateToken, services.create);

// Retrieve all services
router.get('/', validateToken, services.findAll);

// Retrieve a single service with serviceId
router.get('/:serviceId', validateToken, services.findOne);

// Update a service with serviceId
router.put('/:serviceId', validateToken, services.update);

// Delete a service with serviceId
router.delete('/:serviceId', validateToken, services.delete);

module.exports = router;
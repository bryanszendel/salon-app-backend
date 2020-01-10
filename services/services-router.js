const router = require('express').Router();
const {
  validateItemId,
  validatePostReqBody
} = require('../api/middleware.js')

const services = require('./services-controller.js');

// Create a new service
router.post('/', services.create);

// Retrieve all services
router.get('/', services.findAll);

// Retrieve a single service with serviceId
router.get('/:serviceId', services.findOne);

// Update a service with serviceId
router.put('/:serviceId', services.update);

// Delete a service with serviceId
router.delete('/:serviceId', services.delete);

module.exports = router;
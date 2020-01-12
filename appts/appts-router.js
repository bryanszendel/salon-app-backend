const router = require('express').Router();
const {
  validateItemId,
  validatePostReqBody,
  validateToken
} = require('../api/middleware.js')

const appts = require('./appts-controller.js');

// Create a new appointment
router.post('/', validateToken, appts.create);

// Retrieve all appointments
router.get('/', validateToken, appts.findAll);

// Retrieve a single appointment with apptId
router.get('/:apptId', validateToken, appts.findOne);

// Update an appointment with apptId
router.put('/:apptId', validateToken, appts.update);

// Delete an appointment with apptId
router.delete('/:apptId', validateToken, appts.delete);

module.exports = router;
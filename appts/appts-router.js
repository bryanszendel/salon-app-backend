const router = require('express').Router();
const {
  validateItemId,
  validatePostReqBody
} = require('../api/middleware.js')

const appts = require('./appts-controller.js');

// Create a new appointment
router.post('/', appts.create);

// Retrieve all appointments
router.get('/', appts.findAll);

// Retrieve a single appointment with apptId
router.get('/:apptId', appts.findOne);

// Update an appointment with apptId
router.put('/:apptId', appts.update);

// Delete an appointment with apptId
router.delete('/:apptId', appts.delete);

module.exports = router;
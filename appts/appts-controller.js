const Appt = require('./appts-model.js');
const Client = require('../clients/clients-model.js')

// Create and Save a new appt
exports.create = (req, res) => {
  // Validate request
  if(!req.body.clientID) {
    return res.status(400).send({
        message: "ClientID cannot be empty"
    });
  }

  if(!req.body.serviceID) {
    return res.status(400).send({
        message: "ServiceID cannot be empty"
    });
  }

  if(!req.body.datetimeStart) {
    return res.status(400).send({
        message: "Start Time cannot be empty"
    });
  }

  if(!req.body.datetimeEnd) {
    return res.status(400).send({
        message: "End Time cannot be empty"
    });
  }

  // Create a appt
  const appt = new Appt({
    clientID: req.body.clientID,
    serviceID: req.body.serviceID,
    datetimeStart: req.body.datetimeStart,
    datetimeEnd: req.body.datetimeEnd
  });

  // Save appt in the database
  appt.save()
  .then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while creating the appointment."
      });
  });
};

// Retrieve and return all appts from the database.
exports.findAll = (req, res) => {
  Appt.find()
  .then(appts => {
      res.send(appts);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving appointments."
      });
  });
};


// Find a single appt with a apptId
exports.findOne = (req, res) => {
  Appt.findById(req.params.apptId)
  .then(appt => {
      if(!appt) {
          return res.status(404).send({
              message: "Appointment not found with id " + req.params.apptId
          });            
      }
      res.send(appt);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Appointment not found with id " + req.params.apptId
          });                
      }
      return res.status(500).send({
          message: "Error retrieving appt with id " + req.params.apptId
      });
  });
};


// Update an appt identified by the apptId in the request
exports.update = (req, res) => {
  // Validate Request
  if(!req.body.clientID) {
    return res.status(400).send({
        message: "ClientID cannot be empty"
    });
  }
  if(!req.body.serviceID) {
    return res.status(400).send({
        message: "ServiceID cannot be empty"
    });
  }

  // Find appt and update it with the request body
  const updated = {}
  if (req.body.clientID) {
      updated.clientID = req.body.clientID
  }
  if (req.body.serviceID) {
    updated.serviceID = req.body.serviceID
  }

  if (req.body.datetimeStart) {
    updated.datetimeStart = req.body.datetimeStart
  }

  if (req.body.datetimeEnd) {
    updated.datetimeEnd = req.body.datetimeEnd
  }

  Appt.findByIdAndUpdate(req.params.apptId, updated, {new: true})
  .then(appt => {
      if(!appt) {
          return res.status(404).send({
              message: "Appointment not found with id " + req.params.apptId
          });
      }
      res.send(appt);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Appointment not found with id " + req.params.apptId
          });                
      }
      return res.status(500).send({
          message: "Error updating appointment with id " + req.params.apptId
      });
  });
};


// Delete a appt with the specified apptId in the request
exports.delete = (req, res) => {
  Appt.findByIdAndRemove(req.params.apptId)
  .then(appt => {
      if(!appt) {
          return res.status(404).send({
              message: "Appointment not found with id " + req.params.apptId
          });
      }
      res.send({message: "Appointment deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Appointment not found with id " + req.params.apptId
          });                
      }
      return res.status(500).send({
          message: "Could not delete appointment with id " + req.params.apptId
      });
  });
};

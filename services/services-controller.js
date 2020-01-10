const Service = require('./services-model.js');

// Create and Save a new service
exports.create = (req, res) => {
  // Validate request
  if(!req.body.name) {
    return res.status(400).send({
        message: "Service Name cannot be empty"
    });
  }

  if(!req.body.timeBlock) {
    return res.status(400).send({
        message: "Time Block cannot be empty"
    });
  }

  // Create a service
  const service = new Service({
    name: req.body.name,
    timeBlock: req.body.timeBlock
  });

  // Save service in the database
  service.save()
  .then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while creating the service."
      });
  });
};

// Retrieve and return all services from the database.
exports.findAll = (req, res) => {
  Service.find()
  .then(services => {
      res.send(services);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving services."
      });
  });
};


// Find a single service with a serviceId
exports.findOne = (req, res) => {
  Service.findById(req.params.serviceId)
  .then(service => {
      if(!service) {
          return res.status(404).send({
              message: "Service not found with id " + req.params.serviceId
          });            
      }
      res.send(service);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Service not found with id " + req.params.serviceId
          });                
      }
      return res.status(500).send({
          message: "Error retrieving service with id " + req.params.serviceId
      });
  });
};


// Update a service identified by the serviceId in the request
exports.update = (req, res) => {
  // Validate Request
  if(!req.body.name) {
    return res.status(400).send({
        message: "Service Name cannot be empty"
    });
  }
  if(!req.body.timeBlock) {
    return res.status(400).send({
        message: "Time Block cannot be empty"
    });
  }

  // Find service and update it with the request body
  const updated = {}
  if (req.body.name) {
      updated.name = req.body.name
  }
  if (req.body.timeBlock) {
    updated.timeBlock = req.body.timeBlock
  }

  Service.findByIdAndUpdate(req.params.serviceId, updated, {new: true})
  .then(service => {
      if(!service) {
          return res.status(404).send({
              message: "service not found with id " + req.params.serviceId
          });
      }
      res.send(service);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "service not found with id " + req.params.serviceId
          });                
      }
      return res.status(500).send({
          message: "Error updating service with id " + req.params.serviceId
      });
  });
};


// Delete a service with the specified serviceId in the request
exports.delete = (req, res) => {
  Service.findByIdAndRemove(req.params.serviceId)
  .then(service => {
      if(!service) {
          return res.status(404).send({
              message: "Service not found with id " + req.params.serviceId
          });
      }
      res.send({message: "Service deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Service not found with id " + req.params.serviceId
          });                
      }
      return res.status(500).send({
          message: "Could not delete service with id " + req.params.serviceId
      });
  });
};

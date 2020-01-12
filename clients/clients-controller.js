const Client = require('./clients-model.js');
const Appt = require('../appts/appts-model.js');

// Create and Save a new client
exports.create = (req, res) => {
  // Validate request
  if(!req.body.firstName) {
    return res.status(400).send({
        message: "First Name cannot be empty"
    });
  }

  if(!req.body.lastName) {
    return res.status(400).send({
        message: "Last Name cannot be empty"
    });
  }

  if(!req.body.username) {
    return res.status(400).send({
        message: "Username cannot be empty"
    });
  }

  if(!req.body.password) {
    return res.status(400).send({
        message: "Password cannot be empty"
    });
  }

  // Create a client
  const client = new Client({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    username: req.body.username,
    password: req.body.password
  });

  // Save client in the database
  client.save()
  .then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while creating the client."
      });
  });
};

// Retrieve and return all clients from the database.
exports.findAll = (req, res) => {
  Client.find()
  .then(clients => {
    res.send(clients)
  })
  // Client.find(match, function (err, clients) {
  //   let opts = [{ path: 'appts', match: {_id: "5e1a0170fed71e650ffc3147"}}];
  
  //   let promise = Client.populate(clients, opts);
  //   promise.then(console.log).end();
  .catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while retrieving clients."
    });
  });
};


// Find a single client with a clientId
exports.findOne = (req, res) => {
  // let appts = Appt.find({clientID: req.params.clientId})
  Client.findById(req.params.clientId)
  .then(client => {
      if(!client) {
          return res.status(404).send({
              message: "client not found with id " + req.params.clientId
          });            
      }
      Appt.find({clientID: client._id})
      .then(appts => {
        client.appts = appts
        res.send(client);
      })
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "client not found with id " + req.params.clientId
          });                
      }
      return res.status(500).send({
          message: "Error retrieving client with id " + req.params.clientId
      });
  });
};


// Update a client identified by the clientId in the request
exports.update = (req, res) => {
  // Validate Request
  if(!req.body.firstName) {
    return res.status(400).send({
        message: "First Name cannot be empty"
    });
  }
  if(!req.body.lastName) {
    return res.status(400).send({
        message: "Last Name cannot be empty"
    });
  }

  // Find client and update it with the request body
  const updated = {}
  if (req.body.firstName) {
      updated.firstName = req.body.firstName
  }
  if (req.body.lastName) {
    updated.lastName = req.body.lastName
  }
  if (req.body.email) {
    updated.email = req.body.email
  }
  if (req.body.phone) {
    updated.phone = req.body.phone
  }

  Client.findByIdAndUpdate(req.params.clientId, updated, {new: true})
  .then(client => {
      if(!client) {
          return res.status(404).send({
              message: "client not found with id " + req.params.clientId
          });
      }
      res.send(client);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "client not found with id " + req.params.clientId
          });                
      }
      return res.status(500).send({
          message: "Error updating client with id " + req.params.clientId
      });
  });
};


// Delete a client with the specified clientId in the request
exports.delete = (req, res) => {
  Client.findByIdAndRemove(req.params.clientId)
  .then(client => {
      if(!client) {
          return res.status(404).send({
              message: "client not found with id " + req.params.clientId
          });
      }
      res.send({message: "client deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "client not found with id " + req.params.clientId
          });                
      }
      return res.status(500).send({
          message: "Could not delete client with id " + req.params.clientId
      });
  });
};

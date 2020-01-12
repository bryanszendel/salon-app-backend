const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./users-model.js');
const secrets = require('../config/secrets.js');

function generateToken(user) {
  const payload = {
    firstName: user.firstName,
    lastName: user.lastName,
    _id: user._id,
    username: user.username
  }
  const options = {
    expiresIn: '7d'
  }
  return jwt.sign(payload, secrets.jwtSecret, options)
}

// Create and Save a new user
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

  if(!req.body.email) {
    return res.status(400).send({
        message: "Email cannot be empty"
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

  
  // Create a user
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    salon: req.body.salon,
    username: req.body.username,
    password: req.body.password
  });
  
  const hash = bcrypt.hashSync(newUser.password, 10)
  newUser.password = hash;
  
  // Save user in the database
  newUser.save()
  .then(user => {
    user = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      phone: user.phone,
      salon: user.salon,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
    const token = generateToken(newUser)
    res.send({
      user, token
    });
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while creating the user."
      });
  });
};

// Retrieve and return all users from the database.
// exports.findAll = (req, res) => {
//   User.find()
//   .then(users => {
//     res.send(users)
//   })
//   .catch(err => {
//     res.status(500).send({
//         message: err.message || "Some error occurred while retrieving users."
//     });
//   });
// };


// Find a single user with a userId
exports.login = (req, res) => {
  User.findOne({username: req.body.username})
  .then(thisUser => {
      // if(!thisUser) {
      //     return res.status(404).send({
      //         message: "User not found with username, " + req.body.username
      //     });            
      // }

      if (thisUser && bcrypt.compareSync(req.body.password, thisUser.password)) {
        const token = generateToken(thisUser)
        const user = {
          _id: thisUser._id,
          firstName: thisUser.firstName,
          lastName: thisUser.lastName,
          username: thisUser.username,
          email: thisUser.email,
          phone: thisUser.phone,
          salon: thisUser.salon,
          createdAt: thisUser.createdAt,
          updatedAt: thisUser.updatedAt
        }
        res.send({
          user, token
        });
      } else {
        return res.status(401).json({ message: 'Invalid credentials.' })
      }

  }).catch(err => {
      res.status(500).send({
          message: "Error retrieving user with username " + req.body.username
      });
  });
};


// Update a user identified by the userId in the request
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

  // Find user and update it with the request body
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

  User.findByIdAndUpdate(req.params.userId, updated, {new: true})
  .then(user => {
      if(!user) {
          return res.status(404).send({
              message: "user not found with id " + req.params.userId
          });
      }
      res.send(user);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "user not found with id " + req.params.userId
          });                
      }
      return res.status(500).send({
          message: "Error updating user with id " + req.params.userId
      });
  });
};


// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.userId)
  .then(user => {
      if(!user) {
          return res.status(404).send({
              message: "user not found with id " + req.params.userId
          });
      }
      res.send({message: "user deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "user not found with id " + req.params.userId
          });                
      }
      return res.status(500).send({
          message: "Could not delete user with id " + req.params.userId
      });
  });
};

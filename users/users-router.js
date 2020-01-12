const router = require('express').Router();
const {
  validateItemId,
  validatePostReqBody, 
  validateToken
} = require('../api/middleware.js')

const users = require('./users-controller.js');

// Create a new user, returns user info and token
router.post('/register', users.create);

// Retrieve all users
// router.get('/', users.findAll);

// Retrieve a single user and token with username
router.post('/login', users.login);

// Update a user with userId
// TODO: Need to validate that the user is the logged in user
router.put('/:userId', validateToken, users.update);

// Delete a user with userId
// router.delete('/:userId', users.delete);

module.exports = router;
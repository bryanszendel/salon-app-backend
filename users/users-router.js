const router = require('express').Router();
const {
  validateItemId,
  validatePostReqBody
} = require('../api/middleware.js')

const users = require('./users-controller.js');

// Create a new user, returns user info and token
router.post('/register', users.create);

// Retrieve all users
// router.get('/', users.findAll);

// Retrieve a single user and token with username
router.post('/login', users.login);

// Update a user with userId
router.put('/:userId', users.update);

// Delete a user with userId
router.delete('/:userId', users.delete);

module.exports = router;
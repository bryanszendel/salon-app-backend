const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(() => {
  console.log("Successfully connected to Users collection");    
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

const UserSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: Number,
  salon: String,
  username: String,
  password: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
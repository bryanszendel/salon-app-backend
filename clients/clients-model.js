const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema

// Connecting to the database
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(() => {
  console.log("Successfully connected to Clients collection");    
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

const ClientSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: Number,
  username: String,
  password: String,
  appts: [{ type: Schema.Types.ObjectId, ref: 'Appt'}]
}, {
  timestamps: true
});

module.exports = mongoose.model('Client', ClientSchema);

// const personSchema = Schema({
//     _id: Schema.Types.ObjectId,
//     name: String,
//     age: Number,
//     stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
//   });
  
//   const storySchema = Schema({
//     author: { type: Schema.Types.ObjectId, ref: 'Person' },
//     title: String,
//     fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
//   });  
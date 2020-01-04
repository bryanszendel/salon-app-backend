const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
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
    phone: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Client', ClientSchema);
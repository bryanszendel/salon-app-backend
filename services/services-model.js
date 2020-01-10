const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(() => {
    console.log("Successfully connected to Services collection");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

const ServiceSchema = mongoose.Schema({
    name: String,
    timeBlock: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Service', ServiceSchema);
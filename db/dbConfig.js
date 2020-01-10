const mongoose = require('mongoose');

const Client = require('../clients/clients-model.js')
const Item = require('../items/items-model.js')
const Service = require('../services/services-controller.js')

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

module.exports = mongoose.model('Client', Client);
module.exports = mongoose.model('Item', Item);
module.exports = mongoose.model('Service', Service);
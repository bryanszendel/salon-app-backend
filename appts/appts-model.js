const mongoose = require('mongoose');
const Schema = mongoose.Schema

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(() => {
    console.log("Successfully connected to Appointments collection");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

const ApptSchema = mongoose.Schema({
    clientID: {type: Schema.Types.ObjectId, ref: 'Client'},
    serviceID: {type: Schema.Types.ObjectId, ref: 'Service'},
    datetimeStart: Date,
    datetimeEnd: Date
}, {
    timestamps: true
});

module.exports = mongoose.model('Appt', ApptSchema);
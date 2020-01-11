const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

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
    clientID: ObjectId,
    serviceID: ObjectId,
    datetimeStart: Date,
    datetimeEnd: Date
}, {
    timestamps: true
});

module.exports = mongoose.model('Appt', ApptSchema);
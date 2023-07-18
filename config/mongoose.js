const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error',console.log.bind(console,'Error in connecting to database'));

db.once('open',()=>{
    console.log('Connected to db');
});

mongoose.set('debug', true);

module.exports = db;
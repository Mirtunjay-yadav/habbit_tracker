const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/test1', {
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

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mirtunjayy435:Oz2jvHsSDE1fOOyw@cluster0.xni7vvx.mongodb.net/test1', {
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

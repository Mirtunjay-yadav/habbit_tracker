// Import the Express module
const express = require('express');
const expressLayouts = require('express-ejs-layouts');

// Set the port number
const port = process.env.PORT || 8000;

// Create an instance of the Express application
const app = express();

const env = require('dotenv').config();

// Import the Mongoose module for database connection
const db = require('./config/mongoose');

app.use(expressLayouts);

app.set('view engine','ejs');
app.set('views','views');

const homeRouter = require('./routes/home');
app.use('/',homeRouter);

// Start the server and listen on the specified port
app.listen(port,(err)=>{
    if(err){
        console.log(`Error in connecting to server: ${err}`);
    }
    console.log(`Server is Up and running on port number: ${port}`);
});
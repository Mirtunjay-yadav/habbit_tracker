// Import the required modules
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const env = require('dotenv').config();

// Set the port number
const port = process.env.PORT || 8000;

// Create an instance of the Express application
const app = express();

// Connect to the database using Mongoose module
const db = require('./config/mongoose');

app.use(express.json());// Parse JSON request bodies
app.use(express.urlencoded({extended : true}));// Parse URL-encoded request bodies
app.use(cookieParser());// Parse cookies

app.use(expressLayouts);// Enable EJS layouts
app.set('view engine','ejs');// Set EJS as the view engine
app.set('views','views');// Set the views directory

// Serve static files from the 'public' directory
app.use(express.static('./public'));

app.set('layout extractStyles', true);// Extract CSS styles
app.set('layout extractScripts', true);// Extract JavaScript scripts

// Import and use the home router
const homeRouter = require('./routes/home');
app.use('/',homeRouter);

// Start the server and listen on the specified port
app.listen(port,(err)=>{
    if(err){
        console.log(`Error in connecting to server: ${err}`);
    }
    console.log(`Server is Up and running on port number: ${port}`);
});
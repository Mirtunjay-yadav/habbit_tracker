// Import the Express module
const express = require('express');

// Set the port number
const port = process.env.PORT || 8000;

// Create an instance of the Express application
const app = express();

// Start the server and listen on the specified port
app.listen(port,(err)=>{
    if(err){
        console.log(`Error in connecting to server: ${err}`);
    }
    console.log(`Server is Up and running on port number: ${port}`);
});
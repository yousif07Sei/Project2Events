// server.js
// Require dependencies
const express = require('express');
const expressLayout = require('express-ejs-layouts');
require('dotenv').config()

// connect to mongoDB
require('./config/db')

// initialize express app
const app = express();

// get the port number form .env file, if undefined, 3000
const port = process.env.PORT || 3000


//  Middlewares
// Templating Engine
app.set('view engine', 'ejs');
app.use(expressLayout);

// to encode req.body - make form data readable in controllers
app.use(express.urlencoded({ extended: true }));


// Import Routes
const indexRouter = require("./routes/index");
const eventRouter = require("./routes/event");


//------- Mount routes -------//
app.use("/", indexRouter);

// link you static folder i.e. images, css 
app.use(express.static('public'));

// start listening to requests coming from the PORT
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`))

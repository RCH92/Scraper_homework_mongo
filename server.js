const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios'); //request method
const cheerio = require('cheerio'); //scraping tool

// ejs package
var expressLayouts = require('express-ejs-layouts');

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
// models
db = require('./models');

// port
var PORT = process.env.PORT || 3000;

// init express
const app = express();

// middleware

    // EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static(__dirname + "/public"));


// mongoDB link
// mongoose.connect("mongodb://localhost/Mongoscraper", { useNewUrlParser: true });
mongoose.connect(MONGODB_URI);

// routes
require("./routes/api/index.js")(app,axios,cheerio,db);
app.use('/', require("./routes/view"));

//server start 
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });

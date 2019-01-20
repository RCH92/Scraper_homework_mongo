const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios'); //request method
const cheerio = require('cheerio'); //scraping tool

// ejs package
var expressLayouts = require('express-ejs-layouts');


// models
db = require('./models');

// port
var PORT = 3000 || process.env.PORT;

// init express
const app = express();

// middleware

    // EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));


// mongoDB link
mongoose.connect("mongodb://localhost/Mongoscraper", { useNewUrlParser: true });
// routes
require("./routes/api/index.js")(app,axios,cheerio,db);
require("./routes/view/index.js")(app);

//server start 
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });

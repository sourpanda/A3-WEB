// Clinton Sheppard - csheppard4@myseneca.ca - WEB322 Assignment 3 ? 4? 5? maybe all ?
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const controllerG = require("./controllers/general.js");
const db = require('./db.js');
const path = require('path');
require('dotenv').config({path:"./config/keys.env"});
const PORT = process.env.PORT;


var hbs = require('express-handlebars').create({
  defaultLayout: 'main',
  // helpers      : helpers,

  // Uses multiple partials dirs, templates in "shared/templates/" are shared
  // with the client-side of the app (see below).
  partialsDir: [
      'views/partials/',
      'views/fsPartials/'
      ]
  });


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, "views"));
app.use(express.static(__dirname + '/public/'));
app.enable('view cache');
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", controllerG);

/* -------- server online! -------- */

db.initialize()
.then(()=>{
  app.listen(PORT, ()=>{
  console.log(`server online! PORT: ${PORT}`);
  });
})
.catch((data)=>{
  console.log(data);
});
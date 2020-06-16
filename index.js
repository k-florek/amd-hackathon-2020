// index.js

/**
 * Required External Modules
 */
 const express = require("express");
 const path = require("path");
 const mongoose = require("mongoose");
 const bodyParser = require("body-parser");

/**
 * App Variables
 */
 const app = express();
 const port = process.env.PORT || "8000";
 const mongo_uri = "mongodb://admin:admin@localhost:27017/amd-hackathon?authSource=admin"

/**
* Connect to database
*/

 mongoose.connect(mongo_uri, {useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true});
 mongoose.Promise = global.Promise;
 let db = mongoose.connection;
 db.on('error',console.error.bind(console,'Mongodb connection error:'));

/**
 *  App Configuration
 */
 app.set('view engine','pug')
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Routes Definitions
 */

 //Landing Page
 app.get("/", (req, res) => {
  res.status(200).send("The website works!");
});

 //Signup
 const signup = require('./routes/signup.route');
 app.use('/signup',signup);

 //GetScores
 const getScores = require('./routes/scores.route');
 app.use('/getteamscores',getScores)

 //SubmitQuestion


/**
 * Server Activation
 */
 app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

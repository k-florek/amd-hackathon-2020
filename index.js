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
 //get ENV variables
 require('dotenv').config();
 const app = express();
 const port = process.env.PORT;
 const mongo_uri = process.env.MONGO;

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
 app.use(express.static('./views/public'));
/**
 * Routes Definitions
 */

 //Landing Page
 app.get("/", (req, res) => {
  res.render('index',{siteKey:process.env.CAPTCHA_SITE});
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

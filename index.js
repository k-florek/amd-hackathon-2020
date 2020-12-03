// index.js

/**
 * Required External Modules
 */
 const express = require("express");
 const path = require("path");
 const bodyParser = require("body-parser");

/**
 * App Variables
 */
 //get ENV variables
 require('dotenv').config();
 const app = express();
 const port = process.env.PORT;

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
 const index = require('./routes/index.route');
 app.use('/',index);

 //SubmitQuestion
 const questionSubmit = require('./routes/questions.route');
 app.use('/question',questionSubmit);

/**
 * Server Activation
 */
 app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

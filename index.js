// index.js

/**
 * Required External Modules
 */
 const express = require("express");
 const path = require("path");
 const {MongoClient} = require("mongodb");

/**
 * App Variables
 */
 const app = express();
 const port = process.env.PORT || "8000";
 const mongo_uri = "mongodb://admin:admin@localhost:27017/?authSource=admin"
 const client = new MongoClient(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true });
/**
 *  App Configuration
 */

/**
 * Routes Definitions
 */

 app.get("/", (req, res) => {
  res.status(200).send("The website works!");
});

/**
 * Server Activation
 */
 client.connect();
 app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

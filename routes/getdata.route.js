const express = require('express');
const router = express.Router();

const signup_controller = require('../controllers/signup.controller');


//Signup Page
router.get("/", signup_controller.getTeams);

module.exports = router

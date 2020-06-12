const express = require('express');
const router = express.Router();

const signup_controller = require('../controllers/signup.controller');


//Signup Page
router.get("/",(req,res) => {
  res.render('teamSignUp');
});

router.post("/", signup_controller.signup);

module.exports = router

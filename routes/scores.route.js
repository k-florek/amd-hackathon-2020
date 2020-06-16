const express = require('express');
const router = express.Router();

const score_controller = require('../controllers/score.controller');


//Signup Page
router.get("/", score_controller.getTeamScores);

module.exports = router

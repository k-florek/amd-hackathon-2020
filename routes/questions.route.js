const express = require('express');
const router = express.Router();

const score_controller = require('../controllers/question.controller');


//Question Pages
router.get("/", score_controller.getTeamScores);

module.exports = router

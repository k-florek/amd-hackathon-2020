const express = require('express');
const router = express.Router();

const question_controller = require('../controllers/question.controller');


//Question Pages
router.post("/:qid", question_controller.questionSubmit);

module.exports = router

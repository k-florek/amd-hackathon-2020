const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ScoreSchema = new Schema({
  teamName: {type: String, index:true, required: true},
  totalScore: {type: Number},
  totalTime: {type: Number},

  q1CompleteTime: {type: Number},
  q1Points: {type: Number},

  q2CompleteTime: {type: Number},
  q2Points: {type: Number},

  q3CompleteTime: {type: Number},
  q3Points: {type: Number},

  q4CompleteTime: {type: Number},
  q4Points: {type: Number},

  q5CompleteTime: {type: Number},
  q5Points: {type: Number},

  q6CompleteTime: {type: Number},
  q6Points: {type: Number},

  q7CompleteTime: {type: Number},
  q7Points: {type: Number},

  q8CompleteTime: {type: Number},
  q8Points: {type: Number},

  q9CompleteTime: {type: Number},
  q9Points: {type: Number},
  
  q10CompleteTime: {type: Number},
  q10Points: {type: Number},

});

module.exports = mongoose.model('Score',ScoreSchema);

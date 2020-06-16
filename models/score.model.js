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

});

module.exports = mongoose.model('Score',ScoreSchema);

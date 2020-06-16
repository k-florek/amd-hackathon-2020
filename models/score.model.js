const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ScoreSchema = new Schema({
  teamName: {type: String, index:true, required: true},
  totalScore: {type: Number},
  q1CompleteTime: {type: String},
  q1Points: {type:Number},
  q2CompleteTime: {type: String},
  q2Points: {type:Number},

});

module.exports = mongoose.model('Score',ScoreSchema);

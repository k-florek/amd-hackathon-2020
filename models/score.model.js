const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ScoreSchema = new Schema({
  teamName: {type: String, index:true, required: true},
  totalScore: {type: Number},
  questionScores: {type: Map, of: String},  
});

module.exports = mongoose.model('Score',ScoreSchema);

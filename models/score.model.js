const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ScoreSchema = new Schema({
  teamName: {type: String, index:true, required: true},
  token: {type: String, required: true},
  totalScore: {type: Number, default:0},
  totalTime: {type: Number, default:0},

  q01CompleteTime: {type: Number, default:0},
  q01Points: {type: Number, default:0},
  q01Answer: {type:String, default:null},

  q02CompleteTime: {type: Number, default:0},
  q02Points: {type: Number, default:0},
  q02Answer: {type:String, default:null},

  q03CompleteTime: {type: Number, default:0},
  q03Points: {type: Number, default:0},
  q03Answer: {type:String, default:null},

  q04CompleteTime: {type: Number, default:0},
  q04Points: {type: Number, default:0},
  q04Answer: {type:String, default:null},

  q05CompleteTime: {type: Number, default:0},
  q05Points: {type: Number, default:0},
  q05Answer: {type:String, default:null},

  q06CompleteTime: {type: Number, default:0},
  q06Points: {type: Number, default:0},
  q06Answer: {type:String, default:null},

  q07CompleteTime: {type: Number, default:0},
  q07Points: {type: Number, default:0},
  q07Answer: {type:String, default:null},

  q08CompleteTime: {type: Number, default:0},
  q08Points: {type: Number, default:0},
  q08Answer: {type:String, default:null},

  q09CompleteTime: {type: Number, default:0},
  q09Points: {type: Number, default:0},
  q09Answer: {type:String, default:null},

  q10CompleteTime: {type: Number, default:0},
  q10Points: {type: Number, default:0},
  q10Answer: {type:String, default:null},

  q11CompleteTime: {type: Number, default:0},
  q11Points: {type: Number, default:0},
  q11Answer: {type:String, default:null},

});

module.exports = mongoose.model('Score',ScoreSchema);

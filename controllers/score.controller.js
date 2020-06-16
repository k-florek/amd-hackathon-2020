const Scores = require('../models/score.model');
const Teams = require('../models/teams.model');

let startTime = new Date(process.env.START_TIME);


exports.updateScore = function (questionNumber, token) {
  return new Promise((resolve,reject) => {
    let currentTime = new Date();
    let hoursDiff = (currentTime - startTime)/(1000*3600);
    let questionPoints = {};
    let questionTime = {};
    let qFieldPoints = questionNumber + "Points";
    let qFieldTime = questionNumber + "CompleteTime";
    questionPoints[qFieldPoints] = 1;
    questionTime[qFieldTime] = hoursDiff;
    let res = await Teams.updateOne({token:token},{questionPoints,questionTime});
    if(res.n < 1){
      reject(new Error("Incorrect Token"));
    }
    else{
      resolve(res.n);
    }
  });
}

exports.getTeamScores = function (req,res) {
  Scores.find({}, (err,data)=>{
    res.send(data);
  });
}

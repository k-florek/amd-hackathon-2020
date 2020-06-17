const Scores = require('../models/score.model');
const Teams = require('../models/teams.model');

let startTime = new Date(process.env.START_TIME);

function questionAnswered(token,qPts){
  Scores.find({token:token}, (err,data) => {
    if(data.qPts == null){
      return false;
    }
    else{
      return true;
    }
  });
}

exports.updateScore = function (questionNumber, token) {
  return new Promise((resolve,reject) => {
    //determine time it took to answer the question
    let currentTime = new Date();
    let hoursDiff = (currentTime - startTime)/(1000*3600);
    //set variables for data
    let questionPoints = {};
    let questionTime = {};
    let qFieldPoints = questionNumber + "Points";
    let qFieldTime = questionNumber + "CompleteTime";
    //check if question is already answered
    if(!questionAnswered(token,qFieldPoints)){
      reject(new Error("Question already answered"));
    }
    //set points and time
    questionPoints[qFieldPoints] = 1;
    questionTime[qFieldTime] = hoursDiff;
    //update score
    Scores.updateOne({token:token,questionPoints:null},{questionPoints,questionTime}, (err,result) => {
      if(err){
        console.log(err);
      }
      if(res.n < 1){
        reject(new Error("Incorrect Token"));
      }
      else{
        resolve(res.n);
      }
    });
  });
}

function Result(totalTime,totalScore){
  this.totalTime = totalTime;
  this.totalScore = totalScore;
}

exports.getTeamScores = function (req,res) {
  Scores.find({}, (err,data)=>{
    let output = new Object()
    for(let doc in data){
      output[data[doc].teamName] = new Result(data[doc].totalTime,data[doc].totalScore);
    }
    res.send(output);
  });
}

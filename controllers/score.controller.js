const Scores = require('../models/score.model');
const Teams = require('../models/teams.model');

let startTime = new Date(process.env.START_TIME);

async function questionAnswered(token,qPts){
  return new Promise((resolve,reject) =>{
    Scores.find({token:token}, (err,data) => {
      if(err){
        reject(err);
      }
      if(data[0][qPts] == 0){
        resolve(false);
      }
      else{
        resolve(true);
      }
    });
  })
}

exports.updateScore = function (questionNumber, answer, token) {
  return new Promise((resolve,reject) => {
    //determine time it took to answer the question
    let currentTime = new Date();
    let hoursDiff = (currentTime - startTime)/(1000*3600);
    //set variables for data
    let updateData = {};
    let qFieldPoints = questionNumber + "Points";
    let qFieldTime = questionNumber + "CompleteTime";
    let qFieldAnswer = questionNumber + "Answer";
    //check if question is already answered

    questionAnswered(token,qFieldPoints)
      .then(function(qAnswered) {
        if(qAnswered){
          reject("Question already answered");
        }
        else{
          //set points and time
          updateData[qFieldPoints] = 1;
          updateData[qFieldTime] = hoursDiff;
          updateData[qFieldAnswer] = answer
          //update score
          Scores.updateOne({token:token},updateData, (err,result) => {
            if(err){
              reject(err)
            }
            if(result.n < 1){
              reject("Incorrect Token");
            }
            else{
              resolve(result.n);
            }
          });
        }
      })
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

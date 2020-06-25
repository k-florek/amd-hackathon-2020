const Scores = require('../models/score.model');
const Teams = require('../models/teams.model');

let startTime = new Date(process.env.START_TIME);

async function questionAnswered(token,qPts){
  return new Promise((resolve,reject) =>{
    let search = {};
    search["token"] = token;
    search[qPts] = 0;
    Scores.exists(search, (err,data) => {
      if(err){
        reject(err);
      }
      if(data){
        resolve(false);
      }
      else{
        resolve(true);
      }
    });
  })
}

async function checkToken(token){
    return new Promise((resolve,reject) =>{
      Scores.exists({token:token}, (err,data) => {
        if(err){
          reject(err);
        }
        if(data){
          resolve(true);
        }
        else{
          resolve(false);
        }
      });
    });
}

//todo add function for updating total score
async function updateTotalScore(token){
  Scores.findOne({token:token}, (err,data)=>{
    let totalTime = 0;
    let totalScore = 0;
    for(let key in data) {
      if( key.includes('Points') ){
        totalScore = totalScore + data[key];
      }
      if( key.includes('CompleteTime') ){
        totalTime = totalTime + data[key];
      }
    }
    Scores.updateOne({token:token},{totalScore:totalScore,totalTime:totalTime}, (err,result) => {
      if(err){
        console.error(err);
      }
    });
  });
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
    //check token is correct
    checkToken(token)
      .then(function(tokenExists) {
        if(tokenExists){
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
                updateTotalScore(token)
              }
            })
        }
        else{
          reject("Incorrect Token");
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

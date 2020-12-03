const axios = require('axios');
const fs = require('fs');
const fuzz = require('fuzzball');


function checkAnswer(qid,answer) {
  return new Promise((resolve,reject) => {
    fs.readFile('./question_data/qdata.json', (err,data) =>{
      if(err){
        console.error(err);
      }
      let qdata = JSON.parse(data);
      let fuzzRatio = fuzz.ratio(qdata["answers"][qid],answer);
      if(fuzzRatio >= 98){
           resolve(qdata["responses"][qid]);
      }
      else{
        reject(`Sorry that is an incorrect answer.`);
      }
    });
  });
}

exports.questionSubmit = function (req,res) {
  qid = req.params.qid;
  qida = qid+"answer";
  checkAnswer(qid,req.body[qida])
    .then(function(result) {
      res.send({success:true,message:result});
    }, function(err){
      res.send({success:false,message:err});
    })
}

const Score = require('../controllers/score.controller');
const axios = require('axios');
const fs = require('fs');
const fuzz = require('fuzzball');


async function checkReCaptcha(ctoken) {
  return axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET}&response=${ctoken}`, {})
    .then((res)=>{
      if(res.data.success){
        return true;
      }
      else{
        console.warn('reCAPTCHA Unsuccessful');
        console.warn(res.data);
        return false;
      }
    })
    .catch((error) =>{
      console.error(error);
    })
}

function checkAnswer(qid,answer,teamToken) {
  return new Promise((resolve,reject) => {
     let answers = JSON.parse(fs.readFileSync('./question_data/answers.json'));
     let fuzzRatio = fuzz.ratio(answers[qid],answer);
     if(fuzzRatio >= 98){
       Score.updateScore(qid,answer,teamToken)
        .then(function(){
          resolve('Correct!');
        }, function(err){
          reject(err);
        })
     }
     else{
       reject(`Sorry that is an incorrect answer.`);
     }
 });
}

exports.questionSubmit = function (req,res) {
  checkReCaptcha(req.body.ctoken)
    .then(function(captchaResult) {
      if(captchaResult){
        qid = req.params.qid;
        qida = qid+"answer";
        qidt = qid+"token";
        checkAnswer(qid,req.body[qida],req.body[qidt])
          .then(function(result) {
            res.send({success:true,message:result});
          }, function(err){
            res.send({success:false,message:err});
          })
        }
      else{
        res.send({success:false,message:`You appear to be a bot. Bad bot!`});
      }
    })
    .catch(function(err){
      console.error(err);
    })
}

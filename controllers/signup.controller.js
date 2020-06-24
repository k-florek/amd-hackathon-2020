const Team = require('../models/teams.model');
const Scores = require('../models/score.model');
const crypto = require('crypto');
const axios = require('axios');

function checkReCaptcha(ctoken) {
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

exports.signup = function (req,res) {
  //check reCaptcha results
  if(checkReCaptcha(req.body.ctoken)){
    Team.exists({teamName:req.body.teamName}, (err,exists) => {
      if(err){
        console.error(err);
      }
      if(exists){
        res.send({success:false,message:`The team name ${req.body.teamName} is already used.`});
      }
      else{
        const hash = crypto.createHash('sha1');
        let hashData = "amd-2020-" + req.body.teamName;
        hash.update(hashData);
        let token = hash.digest('base64');
        let teamMembers = req.body.teamMembers.split(/\r?\n/g);
        let team = new Team(
          {
            teamName: req.body.teamName,
            contactEmail: req.body.contactEmail,
            teamMembers: teamMembers,
            teamToken: token,
          }
        );
        team.save(function (err){
          if (err){
            console.error(err);
          }
        });
        let score = new Scores(
          {
            teamName: req.body.teamName,
            totalScore: 0,
            totalTime: 0,
          }
        )
        score.save(function (err){
          if (err){
            console.error(err);
          }
        });
        res.send({success:true,message:`Welcome team ${req.body.teamName}!</br>Your secret token is:</br><code>${token}</code><br>use this to submit answers!`});
      }
    });
  }
  else{
    res.send({success:false,message:`Sorry!</br>You appear to be a bot.`});
  }
}

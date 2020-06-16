const Team = require('../models/teams.model');
const Scores = require('../models/score.model');
const hash = require('crypto').createHash('sha1');

exports.signup = function (req,res) {
  Team.exists({teamName:req.body.teamName}, (err,exists) => {
    if(err){
      console.log(err);
    }
    if(exists){
      res.send({success:false,message:`The team name ${req.body.teamName} is already used.`});
    }
    else{
      let hashData = "amd-2020-" + req.body.teamName;
      hash.update(hashData)
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
          console.log(err);
        }
      });
      let score = new Scores(
        {
          teamName: req.body.teamName,
        }
      )
      score.save(function (err){
        if (err){
          console.log(err);
        }
      });
      res.send({success:true,message:`Welcome team ${req.body.teamName}!`});
    }
  });
}

const Team = require('../models/teams.model');
const Scores = require('../models/score.model');
const hash = require('crypto').createHash('sha1');

exports.signup = function (req,res) {
  Team.exists({teamName:req.body.teamName}, (err,exists) => {
    if(err){
      console.log(err);
    }
    if(exists){
      res.send({sucess:false,message:"Team name already exists",data:req.body.teamName});
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
      res.send({sucess:true,message:"Sign up successful",data:req.body.teamName});
    }
  });
}

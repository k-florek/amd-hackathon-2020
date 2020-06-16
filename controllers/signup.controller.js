const Team = require('../models/teams.model');
const hash = require('crypto').createHash('sha1');

exports.signup = function (req,res) {
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
  res.send('Signup Complete.\n Your token is:\n'+token);
}

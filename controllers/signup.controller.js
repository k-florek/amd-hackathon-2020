const Team = require('../models/teams.model');
const Scores = require('../models/score.model');
const crypto = require('crypto');
const axios = require('axios');
const nodemailer = require("nodemailer");

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

async function sendMail(address,token,teamName){
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.emailUserName,
      pass: process.env.emailPassword,
    },
  });

  let info = await transporter.sendMail({
    from: '"AMD Binfo Hunt" <binfohunt2020@gmail.com>', // sender address
    to: address, // list of receivers
    subject: "AMD Binfo Scavenger Hunt Welcome", // Subject line
    text: `Welcome ${teamName}, thanks for signing up!\n Your token is ${token} , use this for answering questions!`, // plain text body
    //html: "<b>Hello world?</b>", // html body
  });
  console.log("Message sent: %s",info.messageId);
}

exports.signup = function (req,res) {
  //check reCaptcha results
  checkReCaptcha(req.body.ctoken).then(function(result) {
    if(result){
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
              token:token
            }
          )
          score.save(function (err){
            if (err){
              console.error(err);
            }
          });
          sendMail(req.body.contactEmail,token,req.body.teamName).catch(console.error);
          res.send({success:true,message:`Welcome team ${req.body.teamName}!</br>Your secret key is:</br><code>${token}</code><br>use this when you submit answers!`});
        }
      });
    }
    else{
      res.send({success:false,message:`Sorry!</br>You appear to be a bot.`});
    }
  });
}

const Team = require('../models/teams.model');
const Scores = require('../models/score.model');
const crypto = require('crypto');
const axios = require('axios');
const nodemailer = require("nodemailer");
const aws = require("aws-sdk");
const handlebars = require("handlebars");
const fs = require("fs");

let readEmailHTMLFile = function(path,callback){
  fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};

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
    SES: new aws.SES({
      apiVersion: '2010-12-01'
    })
  });

  readEmailHTMLFile(__dirname + "/../views/public/assets/email/signup_email.html",function(err,html){
    if(err){
      console.log(err);
    }
    let template = handlebars.compile(html)
    let replacements = {
      teamName:teamName,
      token:token
    }
    let htmlToSend = template(replacements);
    let messageOptions = {
      from: process.env.fromEmail, // sender address
      to: address, // list of receivers
      subject: "AMD Binfo Scavenger Hunt Welcome", // Subject line
      text: `WELCOME TEAM ${teamName}\n AMD Virtual 2020\n Bioinformatics Scavenger Hunt\n\n\n Here is your secret key\n\n This key is required to answer each question.\n Copy and paste the key into the Secret Key box when submitting an answer.\n Do not lose or give away your teams secret key!\n\n\n Your key is ${token}`, // plain text body
      html: htmlToSend, // html body
    }

    transporter.sendMail(messageOptions,function(err,response){
      if(err){
        console.log(err);
      }
      console.log("Message sent: %s",response);
    });
  });
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
          let team = new Team(
            {
              teamName: req.body.teamName,
              contactEmail: req.body.contactEmail,
              teamMemberOne: req.body.teamMemberOne,
              teamMemberTwo: req.body.teamMemberTwo,
              teamMemberThree: req.body.teamMemberThree,
              teamMemberFour: req.body.teamMemberFour,
              teamMemberFive: req.body.teamMemberFive,
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

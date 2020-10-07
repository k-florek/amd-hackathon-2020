const fs = require("fs");

exports.loadIndex = function (req,res) {
  //get Q/A data
  let qa = JSON.parse(fs.readFileSync('./question_data/questions.json'));

  //figure out if its registration time or event time
  let timeSinceEventReg = new Date() - new Date(process.env.REG_START);
  let timeSinceEventStart = new Date() - new Date(process.env.START_TIME);
  let timeSinceEventEnd = new Date() - new Date(process.env.END_TIME);

  //figure out which question sets to display
  let qset = 0;
  if(new Date() - new Date(process.env.QSET1) >= 0){
    qset += 1;
  }
  if(new Date() - new Date(process.env.QSET2) >= 0){
    qset += 1;
  }
  if(new Date() - new Date(process.env.QSET3) >= 0){
    qset += 1;
  }
  if(new Date() - new Date(process.env.QSET4) >= 0){
    qset += 1;
  }

  //status variables
  let registration_open = false;
  let event_started = false;
  let event_ended = false;

  //all open for dev and testing
  if(process.env.ENV=="dev"){
    registration_open = true;
    event_started = true;
    qset = 4;
    res.render('index',{siteKey:process.env.CAPTCHA_SITE,questions:qa,event_started:event_started,registration_open:registration_open,qset:qset,event_ended:event_ended});
    return;
  }

  //registration open
  if( timeSinceEventStart <= 0 && timeSinceEventReg >= 0 ){
    registration_open = true;
    res.render('index',{siteKey:process.env.CAPTCHA_SITE,questions:qa,event_started:event_started,registration_open:registration_open,qset:qset,event_ended:event_ended});
  }

  //event started
  if(timeSinceEventStart >= 0 && timeSinceEventEnd <= 0){
    event_started = true;
    res.render('index',{siteKey:process.env.CAPTCHA_SITE,questions:qa,event_started:event_started,registration_open:registration_open,qset:qset,event_ended:event_ended});
  }

  //registration is closed event is closed
  if(timeSinceEventEnd >= 0 || timeSinceEventReg <= 0){
    event_ended = true;
    res.render('index',{siteKey:process.env.CAPTCHA_SITE,questions:qa,event_started:event_started,registration_open:registration_open,qset:qset,event_ended:event_ended});
  }
}

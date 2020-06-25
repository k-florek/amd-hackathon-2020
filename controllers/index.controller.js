const fs = require("fs");

exports.loadIndex = function (req,res) {
  //get Q/A data
  let qa = JSON.parse(fs.readFileSync('./question_data/questions.json'));

  //figure out if its registration time or event time
  let timeSinceEventStart = new Date() - new Date(process.env.START_TIME);
  let timeSinceEventReg = new Date() - new Date(process.env.REG_START);
  let timeSinceEventEnd = new Date() - new Date(process.env.END_TIME);

  //all open for dev and testing
  let reg = true;
  let e = true;
  res.render('index',{siteKey:process.env.CAPTCHA_SITE,questions:qa,e:e,reg:reg});
  return;

  //registration open
  if( timeSinceEventStart <= 0 && timeSinceEventReg >= 0 ){
    let reg = true;
    let e = false;
    res.render('index',{siteKey:process.env.CAPTCHA_SITE,questions:qa,e:e,reg:reg});
  }

  //event started
  if(timeSinceEventStart >= 0 && timeSinceEventEnd <= 0){
    let reg = false;
    let e = true;
    res.render('index',{siteKey:process.env.CAPTCHA_SITE,questions:qa,e:e,reg:reg});
  }

  //registration is closed event is closed
  if(timeSinceEventEnd >= 0 || timeSinceEventReg <= 0){
    let reg = false;
    let e = false;
    res.render('index',{siteKey:process.env.CAPTCHA_SITE,questions:qa,e:e,reg:reg});
  }
}

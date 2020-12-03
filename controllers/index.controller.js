const fs = require("fs");

exports.loadIndex = function (req,res) {
  //get Q/A data
  let qdata = JSON.parse(fs.readFileSync('./question_data/qdata.json'))["questions"];
  res.render('index',{questions:qdata});
  return;
}

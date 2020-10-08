const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TeamSchema = new Schema({
  teamName: {type: String, required: true},
  contactEmail: {type: String, required: true},
  teamMemberOne: {type: String, required: true},
  teamMemberTwo: {type: String},
  teamMemberThree: {type: String},
  teamMemberFour: {type: String},
  teamMemberFive: {type: String},
  teamToken: {type: String, index:true},
});

module.exports = mongoose.model('Teams',TeamSchema);

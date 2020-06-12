const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TeamSchema = new Schema({
  teamName: {type: String, required: true},
  contactEmail: {type: String, required: true},
  teamMembers: {type: Array, required: true},
  teamToken: {type: String},
});

module.exports = mongoose.model('Teams',TeamSchema);

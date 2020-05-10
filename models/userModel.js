const mongoose = require('mongoose');

const { Schema } = mongoose;
const userModel = new Schema({
  _id: String,
  age: { type: Number },
  name: { type: String },
  sex: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String }

});

module.exports = mongoose.model('User', userModel);

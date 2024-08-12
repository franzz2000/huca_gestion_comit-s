const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique:true},
  fullName: { type: String },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

UserSchema.statics.findByUsername = function(username) {
  return this.findOne({username: username});
}

module.exports = mongoose.model('User', UserSchema);
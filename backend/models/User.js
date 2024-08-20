import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique:true},
  password: { type: String, required: true },
  fullname: { type: String },
  email: { type: String, required: true },
});

UserSchema.statics.findByUsername = function(username) {
  return this.findOne({username: username});
}

const User = mongoose.model('User', UserSchema)

export default User
import mongoose from 'mongoose'

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  jobTitle: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  comment: String,
  identifier: { type: String, required: true, unique: true } // DNI o NIE
});

const Member = mongoose.model('Member', MemberSchema);
export default Member
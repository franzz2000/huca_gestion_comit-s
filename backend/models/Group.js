import mongoose from 'mongoose'

const GroupMemberSchema = new mongoose.Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
  startDate: { type: Date, required: true },
  endDate: Date,
  role: { type: String, required: true },
  comment: String
});

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  tipo1: { type: String },
  tipo2: { type: String },
  constitutionDate: { type: Date, required: true },
  endDate: Date,
  comment: String,
  members: [GroupMemberSchema]
});

const Group = mongoose.model('Group', GroupSchema);
export default Group
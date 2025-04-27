import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  postsToday: { type: Number, default: 0 },
  lastReset: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model('User', UserSchema); 
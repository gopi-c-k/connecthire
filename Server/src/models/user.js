import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, trim: true },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  // For Firebase users this will be null
  password: {
    type: String,
    default: null,
  },

  // Store Firebase UID if applicable
  firebaseUid: {
    type: String,
    default: null,
  },

  // Store provider: 'password', 'google', 'phone'
  provider: {
    type: String,
    enum: ['password', 'google', 'phone'],
    default: 'password',
  },

  refreshToken: {
    type: String,
    default: null,
  },

  role: {
    type: String,
    enum: ['jobseeker', 'company', 'admin'],
    required: true
  },

  active: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Automatically trim name if null/undefined
UserSchema.pre('save', function (next) {
  if (!this.name) this.name = '';
  next();
});

const User = mongoose.model('User', UserSchema);
export default User;

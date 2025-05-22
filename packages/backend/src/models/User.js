import mongoose from 'mongoose';

/**
 * The user schema.
 * 
 * @returns {mongoose.Schema} The user schema.
 */
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  seNumber: {
    type: String,
    trim: true,
    sparse: true
  }
}, {
  // Lägger automatiskt till createdAt och updatedAt
  timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;

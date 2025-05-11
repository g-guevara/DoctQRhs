// File: models/User.js
import mongoose from 'mongoose';

// User schema definition
const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    lowercase: true
  },
  password: { type: String, required: true },
  medicalInfo: {
    allergies: [String],
    conditions: [String],
    medications: [String],
    emergencyContacts: [{
      name: String,
      phone: String,
      relationship: String
    }],
    bloodType: String
  },
  createdAt: { type: Date, default: Date.now }
});

// Create the model or get it if it already exists
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
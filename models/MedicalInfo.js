// File: models/MedicalInfo.js
import mongoose from 'mongoose';
// Note: Make sure to run 'npm install uuid' to add this dependency

// MedicalInfo schema definition
const MedicalInfoSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  publicId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  birthDate: String,
  language: String,
  isOrganDonor: Boolean,
  isPregnant: Boolean,
  medications: [String],
  allergies: [String],
  emergencyContacts: [{
    name: String,
    phone: String,
    relationship: String
  }],
  conditions: [String],
  height: Number,
  weight: Number,
  bloodType: String,
  additionalNotes: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Create the model or get it if it already exists
const MedicalInfo = mongoose.models.MedicalInfo || mongoose.model('MedicalInfo', MedicalInfoSchema);

export default MedicalInfo;
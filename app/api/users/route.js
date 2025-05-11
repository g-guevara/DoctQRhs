import mongoose from 'mongoose';
import { hash } from 'bcryptjs';

// Database connection
const MONGODB_URI = "mongodb+srv://0okm1qaz2wdc:7I4f1UzE1MtPMA3x@cluster0.zjwennm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

if (!global.mongoose) {
  global.mongoose = mongoose.connect(MONGODB_URI);
}

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

// Create the User model if it doesn't exist
const User = mongoose.models.User || mongoose.model('User', UserSchema);

// POST handler for user registration
export async function POST(req) {
  try {
    // Parse request body
    const body = await req.json();
    
    // Check if email already exists
    const existingUser = await User.findOne({ email: body.email.toLowerCase() });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: 'User with this email already exists' }), 
        { status: 400 }
      );
    }
    
    // Hash the password
    const hashedPassword = await hash(body.password, 10);
    
    // Create user object (with hashed password)
    const newUser = new User({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email.toLowerCase(),
      password: hashedPassword,
      // Initialize empty medical info
      medicalInfo: {
        allergies: [],
        conditions: [],
        medications: [],
        emergencyContacts: [],
        bloodType: ''
      }
    });
    
    // Save user to database
    await newUser.save();
    
    // Return success response (without password)
    const userData = newUser.toObject();
    delete userData.password;
    
    return new Response(
      JSON.stringify({ 
        message: 'User registered successfully',
        user: userData
      }), 
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return new Response(
      JSON.stringify({ error: 'Error registering user', details: error.message }), 
      { status: 500 }
    );
  }
}

// GET handler to check if email exists (for form validation)
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    
    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email parameter is required' }), 
        { status: 400 }
      );
    }
    
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    
    return new Response(
      JSON.stringify({ exists: !!existingUser }), 
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Error checking email', details: error.message }), 
      { status: 500 }
    );
  }
}
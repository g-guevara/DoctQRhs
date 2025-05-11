// File: app/api/users/route.js
import { hash } from 'bcryptjs';
import dbConnect from '../../../models/db';
import User from '../../../models/User';

// POST handler for user registration
export async function POST(req) {
  try {
    // Connect to the database
    await dbConnect();
    
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
    // Connect to the database
    await dbConnect();
    
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
// File: app/api/auth/route.js
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import dbConnect from '../../../models/db';
import User from '../../../models/User';

// JWT Secret - In production, this should be stored in environment variables
const JWT_SECRET = process.env.JWT_SECRET || "doctqr-jwt-secret-key";

export async function POST(req) {
  try {
    // Connect to the database
    await dbConnect();
    
    const { email, password } = await req.json();
    
    // Validate input
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: 'Email and password are required' }), 
        { status: 400 }
      );
    }
    
    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    
    // Check if user exists
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Invalid email or password' }), 
        { status: 401 }
      );
    }
    
    // Verify password
    const isPasswordValid = await compare(password, user.password);
    
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ error: 'Invalid email or password' }), 
        { status: 401 }
      );
    }
    
    // Create JWT token
    const token = sign(
      { 
        userId: user._id,
        email: user.email
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // Prepare user data (without password)
    const userData = user.toObject();
    delete userData.password;
    
    // Return success with token and user data
    return new Response(
      JSON.stringify({
        message: 'Login successful',
        token,
        user: userData
      }),
      { 
        status: 200,
        headers: {
          'Set-Cookie': `auth-token=${token}; Path=/; HttpOnly; Max-Age=${60 * 60 * 24 * 7}; SameSite=Strict`
        }
      }
    );
    
  } catch (error) {
    console.error('Login error:', error);
    return new Response(
      JSON.stringify({ error: 'Login failed', details: error.message }), 
      { status: 500 }
    );
  }
}
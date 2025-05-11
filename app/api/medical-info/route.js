// File: app/api/medical-info/route.js
import { v4 as uuidv4 } from 'uuid';
import dbConnect from '../../../models/db';
import User from '../../../models/User';
import MedicalInfo from '../../../models/MedicalInfo';
import { verify } from 'jsonwebtoken';

// JWT Secret - In production, this should be stored in environment variables
const JWT_SECRET = process.env.JWT_SECRET || "doctqr-jwt-secret-key";

// Middleware to get the current user from a token
const getCurrentUser = async (req) => {
  try {
    // Get token from cookies
    const cookieHeader = req.headers.get('cookie') || '';
    const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {});
    
    const token = cookies['auth-token'];
    
    if (!token) {
      return null;
    }
    
    // Verify token
    const decoded = verify(token, JWT_SECRET);
    
    // Find user by ID
    await dbConnect();
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return null;
    }
    
    return user;
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
};

// POST: Create or update medical info
export async function POST(req) {
  try {
    // Connect to the database
    await dbConnect();
    
    // Get the current user
    const user = await getCurrentUser(req);
    
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }), 
        { status: 401 }
      );
    }
    
    // Parse request body
    const medicalData = await req.json();
    
    // Find existing medical info or create new one
    let medicalInfo = await MedicalInfo.findOne({ userId: user._id });
    
    if (medicalInfo) {
      // Update existing medical info
      Object.assign(medicalInfo, {
        ...medicalData,
        updatedAt: new Date()
      });
    } else {
      // Create new medical info with a unique public ID
      medicalInfo = new MedicalInfo({
        ...medicalData,
        userId: user._id,
        publicId: uuidv4(),
      });
    }
    
    // Save to database
    await medicalInfo.save();
    
    // Return the updated medical info with the public URL
    const host = req.headers.get('host');
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const publicUrl = `${protocol}://${host}/view/${medicalInfo.publicId}`;
    
    return new Response(
      JSON.stringify({ 
        message: 'Medical information saved successfully',
        medicalInfo: medicalInfo,
        publicUrl: publicUrl
      }), 
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error saving medical info:', error);
    return new Response(
      JSON.stringify({ error: 'Error saving medical information', details: error.message }), 
      { status: 500 }
    );
  }
}

// GET: Retrieve the current user's medical info
export async function GET(req) {
  try {
    // Connect to the database
    await dbConnect();
    
    // Get the current user
    const user = await getCurrentUser(req);
    
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }), 
        { status: 401 }
      );
    }
    
    // Find medical info for this user
    const medicalInfo = await MedicalInfo.findOne({ userId: user._id });
    
    if (!medicalInfo) {
      return new Response(
        JSON.stringify({ 
          message: 'No medical information found for this user',
          exists: false
        }), 
        { status: 200 }
      );
    }
    
    // Generate the public URL
    const host = req.headers.get('host');
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const publicUrl = `${protocol}://${host}/view/${medicalInfo.publicId}`;
    
    return new Response(
      JSON.stringify({ 
        medicalInfo,
        publicUrl,
        exists: true
      }), 
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error retrieving medical info:', error);
    return new Response(
      JSON.stringify({ error: 'Error retrieving medical information', details: error.message }), 
      { status: 500 }
    );
  }
}
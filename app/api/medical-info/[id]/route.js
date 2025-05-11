// File: app/api/medical-info/[id]/route.js
import dbConnect from '../../../../models/db';
import User from '../../../../models/User';
import MedicalInfo from '../../../../models/MedicalInfo';

export async function GET(req, { params }) {
  try {
    // Connect to the database
    await dbConnect();
    
    const { id } = params;
    
    // Find medical info by public ID
    const medicalInfo = await MedicalInfo.findOne({ publicId: id });
    
    if (!medicalInfo) {
      return new Response(
        JSON.stringify({ error: 'Medical information not found' }), 
        { status: 404 }
      );
    }
    
    // Get user associated with this medical info to include name
    const user = await User.findById(medicalInfo.userId);
    
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'User not found' }), 
        { status: 404 }
      );
    }
    
    // Combine user name with medical info
    const medicalInfoWithName = {
      ...medicalInfo.toObject(),
      firstName: user.firstName,
      lastName: user.lastName
    };
    
    // Return the medical info with user's name
    return new Response(
      JSON.stringify(medicalInfoWithName), 
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error fetching medical info:', error);
    return new Response(
      JSON.stringify({ error: 'Error retrieving medical information', details: error.message }), 
      { status: 500 }
    );
  }
}
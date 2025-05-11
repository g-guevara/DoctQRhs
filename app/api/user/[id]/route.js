// File: app/api/user/[id]/route.js
export async function GET(req, { params }) {
  try {
    const { id } = params;
    
    if (!id) {
      return new Response(
        JSON.stringify({ error: 'User ID is required' }), 
        { status: 400 }
      );
    }
    
    // In a real app, you would fetch user data from your database
    // For now, return mock data
    const userData = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      // Add any other fields you want to expose
    };
    
    return new Response(
      JSON.stringify(userData),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to retrieve user data' }), 
      { status: 500 }
    );
  }
}
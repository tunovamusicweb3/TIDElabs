import { getDb } from '../db';

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();

    if (!email || !name) {
      return new Response(
        JSON.stringify({ error: 'Email and name are required' }),
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400 }
      );
    }

    // Store in database
    const db = await getDb();
    if (db) {
      // This is a placeholder - you would need to create a waitlist table in your schema
      console.log('Waitlist entry:', { email, name, timestamp: new Date() });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Successfully added to waitlist',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Waitlist API error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process waitlist request' }),
      { status: 500 }
    );
  }
}


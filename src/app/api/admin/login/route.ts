import { NextResponse } from 'next/server';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@stillfitnessacademy.in';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'StillFitnessAdmin2026';
const SESSION_TOKEN = 'StillFitnessAdminSession2026'; // Simple session token

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true, message: 'Logged in successfully.' });
      
      // Set HTTP-only cookie
      response.cookies.set('admin_token', SESSION_TOKEN, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/'
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: 'Incorrect email or password.' },
      { status: 401 }
    );
  } catch (error) {
    console.error('API Admin Login Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error.' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const token = cookieHeader
    .split(';')
    .find(c => c.trim().startsWith('admin_token='))
    ?.split('=')[1];

  if (token === SESSION_TOKEN) {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}

export async function DELETE() {
  // Logout
  const response = NextResponse.json({ success: true, message: 'Logged out successfully.' });
  response.cookies.set('admin_token', '', { maxAge: 0, path: '/' });
  return response;
}

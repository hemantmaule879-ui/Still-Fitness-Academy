import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, course, message, city, type } = body;

    // Validation
    if (!name || !phone || !course || !type) {
      return NextResponse.json(
        { success: false, error: 'Required fields are missing: name, phone, course, and type are mandatory.' },
        { status: 400 }
      );
    }

    if (type !== 'enquiry' && type !== 'demo') {
      return NextResponse.json(
        { success: false, error: 'Invalid enquiry type.' },
        { status: 400 }
      );
    }

    const inquiry = db.createInquiry({
      name,
      phone,
      email: email || '',
      course,
      message: message || '',
      city: city || '',
      type
    });

    return NextResponse.json({ success: true, inquiry });
  } catch (error: any) {
    console.error('API Contact Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process inquiry. Internal Server Error.' },
      { status: 500 }
    );
  }
}

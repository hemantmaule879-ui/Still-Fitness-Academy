import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    const results = db.getResults();
    return NextResponse.json({ success: true, results });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch results' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { studentName, examQualified, rankPosition, beforeStory, afterStory, imageUrl } = body;

    if (!studentName || !examQualified || !rankPosition) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const result = db.createResult({
      studentName,
      examQualified,
      rankPosition,
      beforeStory: beforeStory || '',
      afterStory: afterStory || '',
      imageUrl: imageUrl || '/images/cadet_uniform_1.png'
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create result' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, studentName, examQualified, rankPosition, beforeStory, afterStory, imageUrl, createdAt } = body;

    if (!id || !studentName || !examQualified || !rankPosition) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const success = db.updateResult({
      id,
      studentName,
      examQualified,
      rankPosition,
      beforeStory: beforeStory || '',
      afterStory: afterStory || '',
      imageUrl: imageUrl || '/images/cadet_uniform_1.png',
      createdAt: createdAt || new Date().toISOString()
    });

    if (!success) {
      return NextResponse.json({ success: false, error: 'Result not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update result' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing id parameter' }, { status: 400 });
    }

    db.deleteResult(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete result' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { getDb, genId, queryAll, insertContact } from '@/lib/db';

export async function GET() {
  getDb();
  const contacts = queryAll("SELECT * FROM contacts ORDER BY created_at DESC");
  return NextResponse.json(contacts);
}

export async function POST(request: NextRequest) {
  getDb();
  const body = await request.json();

  if (!body.message) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }

  const id = genId();
  insertContact({
    id,
    name: body.name || '',
    email: body.email || '',
    message: body.message,
    created_at: new Date().toISOString(),
  });

  return NextResponse.json({ success: true, message: 'Message received' });
}

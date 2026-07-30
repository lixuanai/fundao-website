import { NextRequest, NextResponse } from 'next/server';
import { getDb, genId, queryAll, saveDb } from '@/lib/db';

export async function GET() {
  await getDb();
  const contacts = queryAll("SELECT * FROM contacts ORDER BY created_at DESC");
  return NextResponse.json(contacts);
}

export async function POST(request: NextRequest) {
  await getDb();
  const body = await request.json();

  if (!body.message) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }

  const id = genId();
  const db = await getDb();
  db.run(
    "INSERT INTO contacts (id, name, email, message) VALUES (?,?,?,?)",
    [id, body.name || '', body.email || '', body.message]
  );
  saveDb();

  return NextResponse.json({ success: true, message: 'Message received' });
}

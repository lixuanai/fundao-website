import { NextRequest, NextResponse } from 'next/server';
import { getDb, genId, queryAll, insertContact } from '@/lib/db';
import { sendContactNotification } from '@/lib/email';

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
  const contact = {
    id,
    name: body.name || '',
    email: body.email || '',
    subject: body.subject || '',
    message: body.message,
    created_at: new Date().toISOString(),
  };
  insertContact(contact);

  // Send email notification (non-blocking)
  const adminEmail = process.env.ADMIN_EMAIL || 'lfcpeipei@gmail.com';
  sendContactNotification(adminEmail, {
    name: contact.name,
    email: contact.email,
    subject: contact.subject,
    message: contact.message,
  }).catch(err => console.error('Email notification failed:', err));

  return NextResponse.json({ success: true, message: 'Message received' });
}

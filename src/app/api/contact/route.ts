import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'fs';
import { dirname } from 'path';

const CONTACTS_FILE = process.cwd() + '/backend/db/contacts.json';

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

function loadContacts(): Contact[] {
  try {
    if (!existsSync(CONTACTS_FILE)) return [];
    return JSON.parse(readFileSync(CONTACTS_FILE, 'utf-8'));
  } catch { return []; }
}

function saveContacts(contacts: Contact[]) {
  mkdirSync(dirname(CONTACTS_FILE), { recursive: true });
  writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, email, message' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const contact: Contact = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2),
      name,
      email,
      subject: subject || '',
      message,
      createdAt: new Date().toISOString(),
    };

    const contacts = loadContacts();
    contacts.push(contact);
    saveContacts(contacts);

    console.log('Contact form submission saved:', contact);

    return NextResponse.json({
      success: true,
      message: 'Message received. We will contact you soon.',
      contactId: contact.id,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const contacts = loadContacts();
  return NextResponse.json(contacts);
}

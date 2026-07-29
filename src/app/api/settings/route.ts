import { NextRequest, NextResponse } from 'next/server';
import { getDb, queryAll, queryOne, saveDb } from '@/lib/db';

export async function GET(request: NextRequest) {
  await getDb();
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  if (key) {
    const setting = queryOne("SELECT * FROM site_settings WHERE key = ?", [key]);
    return NextResponse.json(setting || {});
  }

  const settings = queryAll("SELECT * FROM site_settings");
  return NextResponse.json(settings);
}

export async function POST(request: NextRequest) {
  await getDb();
  const apiKey = request.headers.get('x-api-key');
  if (!apiKey) return NextResponse.json({ error: 'Missing API key' }, { status: 401 });

  const key = queryOne("SELECT permissions FROM api_keys WHERE key = ? AND active = 1", [apiKey]);
  if (!key) return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });

  const body = await request.json();
  const now = new Date().toISOString();
  const db = await getDb();
  db.run(
    "INSERT OR REPLACE INTO site_settings (key, value, updated_at) VALUES (?,?,?)",
    [body.key, body.value, now]
  );
  saveDb();
  return NextResponse.json({ updated: true });
}

import { NextRequest, NextResponse } from 'next/server';
import { getDb, queryAll, upsertSetting } from '@/lib/db';

export async function GET(request: NextRequest) {
  getDb();
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  if (key) {
    const setting = queryAll("SELECT * FROM site_settings WHERE key = ?", [key]);
    return NextResponse.json(setting.length ? setting[0] : {});
  }

  const settings = queryAll("SELECT * FROM site_settings");
  return NextResponse.json(settings);
}

export async function POST(request: NextRequest) {
  getDb();
  const apiKey = request.headers.get('x-api-key');
  if (!apiKey) return NextResponse.json({ error: 'Missing API key' }, { status: 401 });

  const key = queryAll("SELECT * FROM api_keys WHERE key = ?", [apiKey]);
  if (!key.length) return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });

  const body = await request.json();
  upsertSetting(body.key, body.value);
  return NextResponse.json({ updated: true });
}

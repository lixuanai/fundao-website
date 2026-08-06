import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const headersList = headers();
  const host = headersList.get('host') || '';
  const url = new URL(`https://${host}/zh`);
  return NextResponse.redirect(url, 301);
}

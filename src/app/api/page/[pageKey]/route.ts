import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000';

export async function GET(
  request: NextRequest,
  { params }: { params: { pageKey: string } }
) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || 'zh';
  
  try {
    const response = await fetch(`${BACKEND_URL}/api/page/${params.pageKey}?lang=${lang}`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch page content' }, { status: 500 });
  }
}

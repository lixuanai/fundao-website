import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000';
const AGENT_API_KEY = process.env.AGENT_API_KEY || '';

export async function POST(
  request: NextRequest,
  { params }: { params: { pageKey: string } }
) {
  try {
    const body = await request.json();
    
    const response = await fetch(`${BACKEND_URL}/api/agent/page/${params.pageKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': AGENT_API_KEY,
      },
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }
    
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to update page content' }, { status: 500 });
  }
}

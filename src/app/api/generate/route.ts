import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: 'GET from /api/generate' });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  return NextResponse.json({ message: 'POST from /api/generate', data });
} 
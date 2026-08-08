import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/mock-db';
import { BranchInput } from '@/types/branch';

export async function GET() {
  return NextResponse.json(db.all());
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  // تحويل 'active' إلى 'open' لو جت من الـ UI
  const payload: BranchInput = {
    ...body,
    status: body.status === 'active' ? 'open' : 'closed'
  };

  const branch = db.create(payload);
  return NextResponse.json(branch);
}
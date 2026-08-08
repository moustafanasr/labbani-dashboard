import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/mock-db';
import { BranchInput } from '@/types/branch';

export async function GET() {
  return NextResponse.json(db.all());
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  // أهم تعديل: نضيف manager بقيمة افتراضية لو مش موجود
  const payload: BranchInput = {
    ...body,
    manager: body.manager || 'مدير افتراضي',
    status: body.status === 'active' ? 'open' : 'closed'
  };

  const branch = db.create(payload);
  return NextResponse.json(branch);
}
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/mock-db';
import { BranchInput } from '@/types/branch';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  
  // تحويل 'active' إلى 'open' لو جت من الـ UI
  const payload: Partial<BranchInput> = {
    ...body,
    status: body.status === 'active' ? 'open' : 'closed'
  };

  const branch = db.update(params.id, payload);
  if (!branch) {
    return NextResponse.json({ error: 'Branch not found' }, { status: 404 });
  }
  return NextResponse.json(branch);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const deleted = db.remove(params.id);
  if (!deleted) {
    return NextResponse.json({ error: 'Branch not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
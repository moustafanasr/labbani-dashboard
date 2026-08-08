import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/mock-db';
import { BranchInput } from '@/types/branch';

export async function PUT(
  request: NextRequest,
  // هنا نغير النوع عشان نرضي Next.js 15+
  context: { params: any }
) {
  const body = await request.json();
  const { id } = context.params;
  
  const payload: Partial<BranchInput> = {
    ...body,
    status: body.status === 'active' ? 'open' : 'closed'
  };

  const branch = db.update(id, payload);
  if (!branch) {
    return NextResponse.json({ error: 'Branch not found' }, { status: 404 });
  }
  return NextResponse.json(branch);
}

export async function DELETE(
  request: NextRequest,
  // هنا كمان نغير النوع
  context: { params: any }
) {
  const { id } = context.params;
  const deleted = db.remove(id);
  if (!deleted) {
    return NextResponse.json({ error: 'Branch not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
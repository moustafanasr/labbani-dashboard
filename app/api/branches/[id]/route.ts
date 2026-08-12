import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/mock-db';
import { BranchInput } from '@/types/branch';

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // ✅ تم التعديل هنا
) {
  try {
    const { id } = await context.params; // ✅ فك الـ Promise
    const body = await request.json();
    
    // تحويل البيانات لإرضاء الـ TypeScript
    const payload: BranchInput = {
      name: body.name || '',
      nameAr: body.nameAr || '',
      city: body.city || '',
      isActive: body.isActive ?? true,
      openingTime: body.openingTime || '09:00',
      closingTime: body.closingTime || '23:00',
      phoneNumber: body.phoneNumber || '',
      address: {
        latitude: body.address?.latitude || 0,
        longitude: body.address?.longitude || 0,
        country: body.address?.country || 'Saudi Arabia',
        region: body.address?.region || '',
        governorate: body.address?.governorate || '',
        city: body.address?.city || body.city || '',
        district: body.address?.district || '',
        street: body.address?.street || '',
        buildingNumber: body.address?.buildingNumber || '',
        floor: body.address?.floor || '',
        apartment: body.address?.apartment || '',
        landmark: body.address?.landmark || '',
        notes: body.address?.notes || '',
      },
      fulfillmentMethods: Array.isArray(body.fulfillmentMethods) 
        ? body.fulfillmentMethods.map((m: any) => m.fulfillmentMethod || m)
        : [],
    };

    const branch = db.update(id, payload);
    if (!branch) {
      return NextResponse.json({ error: 'Branch not found' }, { status: 404 });
    }
    return NextResponse.json(branch);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // ✅ تم التعديل هنا
) {
  const { id } = await context.params; // ✅ فك الـ Promise
  const deleted = db.remove(id);
  if (!deleted) {
    return NextResponse.json({ error: 'Branch not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
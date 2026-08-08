// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';

// بيانات المستخدمين الثابتة
const VALID_USERS = [
  {
    id: '1',
    email: 'admin@labbani.sa',
    password: 'password',
    name: 'أحمد محمد',
    role: 'Administrator'
  },
  {
    id: '2',
    email: 'manager@labbani.sa',
    password: 'manager123',
    name: 'مدير الفروع',
    role: 'Manager'
  }
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني وكلمة المرور مطلوبان' },
        { status: 400 }
      );
    }

    const user = VALID_USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { error: 'بيانات الدخول غير صحيحة' },
        { status: 401 }
      );
    }

    const token = Buffer.from(
      JSON.stringify({
        userId: user.id,
        email: user.email,
        role: user.role,
        exp: Date.now() + 24 * 60 * 60 * 1000
      })
    ).toString('base64');

    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      token: token
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم' },
      { status: 500 }
    );
  }
}
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';

export default function LoginPage() {
  const router = useRouter();
  // بيانات افتراضية لتسهيل الاختبار
  const [email, setEmail] = useState('super-admin@labani.local');
  const [password, setPassword] = useState('JlMvCBN54xA4L0r');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // استدعاء الـ API الحقيقي
      const response = await api.post('/auth/login', { email, password });
      
      // تخزين الـ Token (السيرفر قد يرجع باسم access_token أو token)
      if (response.data && response.data.accessToken) {
        localStorage.setItem('labbani_auth_token', response.data.accessToken);
        // ✅ تخزين refreshToken إذا وُجد
        if (response.data.refreshToken) {
          localStorage.setItem('labbani_refresh_token', response.data.refreshToken);
        }
        router.push('/dashboard/branches');
      } else {
        setError('لم يتم استلام التوكن من السيرفر');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'فشل تسجيل الدخول. تأكد من البيانات.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-[#F3F3F3]">
        <h1 className="text-2xl font-bold text-[#1C1C1C] text-center mb-6">تسجيل الدخول</h1>
        
        <form onSubmit={handleLogin} className="space-y-4 text-right">
          <div>
            <label className="block text-sm font-medium text-[#1C1C1C] mb-1">البريد الإلكتروني</label>
            <Input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1C1C1C] mb-1">كلمة المرور</label>
            <Input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'جاري تسجيل الدخول...' : 'دخول'}
          </Button>
        </form>
      </div>
    </div>
  );
}
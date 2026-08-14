import axios from 'axios';

// ✅ الرابط المباشر للـ Backend
const BASE_URL = 'https://dev-labani-backend.oxa4rl.easypanel.host/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*',
  },
});

// ✅ إضافة الـ Token للطلب
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('labbani_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// ✅ معالجة الـ 401 (انتهاء صلاحية التوكن) - تحديث تلقائي
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // ✅ 1. جلب refreshToken من التخزين
        const refreshToken = localStorage.getItem('labbani_refresh_token');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // ✅ 2. إرسال طلب refresh إلى السيرفر
        const { data } = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken });

        // ✅ 3. تحديث التخزين بالتوكن الجديد
        if (data.accessToken) {
          localStorage.setItem('labbani_auth_token', data.accessToken);
          if (data.refreshToken) {
            localStorage.setItem('labbani_refresh_token', data.refreshToken);
          }
          // ✅ 4. تحديث الـ Authorization وإعادة الطلب الأصلي
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // ✅ لو فشل التحديث، نسحب التوكن ونوجه للـ login
        localStorage.removeItem('labbani_auth_token');
        localStorage.removeItem('labbani_refresh_token');
        if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
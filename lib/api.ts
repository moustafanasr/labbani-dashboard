import axios from 'axios';

const BASE_URL = 'https://dev-labani-backend.oxa4rl.easypanel.host/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*',
  },
});

// إضافة الـ Token للطلب
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('labbani_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// معالجة الـ 401 (انتهاء صلاحية التوكن) - إعادة توجيه لصفحة تسجيل الدخول
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // محاولة تحديث التوكن (لو كان في السيرفر endpoint للـ refresh)
      // في حالتنا الحالية، سنقوم بمسح التوكن وإعادة التوجيه للـ login
      localStorage.removeItem('labbani_auth_token');
      
      // منع التوجيه اللانهائي
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
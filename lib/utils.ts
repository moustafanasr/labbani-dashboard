// تحويل الرقم إلى عملة سعودية
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'SAR',
    maximumFractionDigits: 0,
  }).format(amount);
};

// تنسيق التاريخ
export const formatDate = (dateString: string) => {
  return dateString;
};
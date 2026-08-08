import type { Branch, BranchInput } from "@/types/branch";

const initial: Branch[] = [
  { id: "1", name: "فرع الرياض", code: "RYD-01", phone: "+966 55 884 2828", email: "riyadh@labbani.sa", address: "Umm Al Qura Road", city: "الرياض", latitude: 21.5433, longitude: 39.1728, status: "open", manager: "أحمد محمد العتيبي", productCount: 428, sales: 48920, lastUpdated: "01 أغسطس 2026", createdAt: "2026-01-14" },
  { id: "2", name: "فرع جدة", code: "JED-02", phone: "+966 53 884 2828", email: "jeddah@labbani.sa", address: "Prince Mutaib Road", city: "جدة", latitude: 21.5847, longitude: 39.2134, status: "open", manager: "سارة عبدالله القحطاني", productCount: 392, sales: 38640, lastUpdated: "01 أغسطس 2026", createdAt: "2026-02-02" },
  { id: "3", name: "فرع الدمام", code: "DMM-03", phone: "+966 54 210 9971", email: "dammam@labbani.sa", address: "Al Ferdous District", city: "الدمام", latitude: 21.6261, longitude: 39.1651, status: "open", manager: "خالد محمد الحربي", productCount: 348, sales: 24180, lastUpdated: "01 أغسطس 2026", createdAt: "2026-03-18" },
  { id: "4", name: "فرع الخبر", code: "KHB-04", phone: "+966 55 440 1280", email: "khobar@labbani.sa", address: "Sari Street", city: "الخبر", latitude: 21.5769, longitude: 39.1442, status: "closed", manager: "نورة سعد المطيري", productCount: 312, sales: 19840, lastUpdated: "01 أغسطس 2026", createdAt: "2026-04-07" },
  { id: "5", name: "فرع مكة", code: "MKK-05", phone: "+966 56 201 4820", email: "makkah@labbani.sa", address: "Palestine Street", city: "مكة المكرمة", latitude: 21.5268, longitude: 39.1654, status: "open", manager: "محمد سعد الغامدي", productCount: 284, sales: 15420, lastUpdated: "01 أغسطس 2026", createdAt: "2026-05-11" },
  { id: "6", name: "فرع المدينة", code: "MDN-06", phone: "+966 55 810 2020", email: "madinah@labbani.sa", address: "Hira Street", city: "المدينة المنورة", latitude: 21.6032, longitude: 39.1401, status: "closed", manager: "ريم فهد الشهري", productCount: 0, sales: 0, lastUpdated: "01 أغسطس 2026", createdAt: "2026-06-23" }
];

let branches = [...initial];

export const db = {
  all: () => branches,
  create: (input: BranchInput) => {
    // عند الإضافة، نضيف حقول جديدة بقيم افتراضية
    const b = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString().slice(0, 10),
      productCount: 0,
      sales: 0,
      lastUpdated: new Date().toLocaleDateString('ar-EG')
    };
    branches = [b, ...branches];
    return b;
  },
  update: (id: string, input: Partial<BranchInput>) => {
    const old = branches.find(b => b.id === id);
    if (!old) return null;
    const b = { ...old, ...input, lastUpdated: new Date().toLocaleDateString('ar-EG') };
    branches = branches.map(x => x.id === id ? b : x);
    return b;
  },
  remove: (id: string) => {
    const exists = branches.some(b => b.id === id);
    branches = branches.filter(b => b.id !== id);
    return exists;
  }
};
"use client";

import React, { useState, useEffect } from 'react';
import AdminSidebar from './admin-sidebar';
import AdminTopbar from './admin-topbar';
import { Sheet } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-row-reverse">
      <div className="hidden lg:block fixed right-0 top-0 h-screen w-[240px] bg-white border-l border-[rgba(21,84,42,0.07)] z-50 shrink-0">
        <AdminSidebar />
      </div>

      <Sheet open={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
        <div className="h-full w-full overflow-y-auto">
          <AdminSidebar />
        </div>
      </Sheet>

      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isMobile ? 'mr-0' : 'mr-[240px]'}`}>
        <AdminTopbar 
          onMenuToggle={() => setIsMobileMenuOpen(true)} 
          showMenuButton={isMobile} 
        />
        <main className="flex-1 p-4 md:p-8 w-full max-w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
"use client";

import React from 'react';

interface SheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Sheet = ({ open, onClose, children }: SheetProps) => {
  if (!open) return null;

  return (
    <>
      {/* الخلفية المعتمة */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity" 
        onClick={onClose}
      />
      {/* الـ Drawer نفسه - في الموبايل عرضه 85% من الشاشة */}
      <div className="fixed right-0 top-0 h-full w-[85%] max-w-[320px] bg-white z-50 shadow-xl transition-transform transform translate-x-0">
        {children}
      </div>
    </>
  );
};
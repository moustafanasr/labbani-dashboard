"use client";

import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* رأس المودال */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F3F3F3] shrink-0">
          <h2 className="text-lg font-bold text-[#1C1C1C]">{title}</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-[#F3F3F3] rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-[#666666]" />
          </button>
        </div>
        
        {/* محتوى المودال (قابل للتمرير لو طويل) */}
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
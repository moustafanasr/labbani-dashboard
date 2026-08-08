"use client";

import React from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownProps {
  label: string;
  options: string[];
}

const Dropdown = ({ label, options }: DropdownProps) => {
  return (
    <div className="relative inline-block w-full sm:w-auto">
      <button className="flex items-center justify-between gap-2 border border-[#E2E2E2] bg-white rounded-lg px-4 py-2 text-sm text-[#1C1C1C] hover:bg-[#F8F8F2] min-w-[120px] w-full sm:w-auto">
        <span>{label}</span>
        <ChevronDown className="w-4 h-4 text-[#111827]" />
      </button>
    </div>
  );
};

export default Dropdown;
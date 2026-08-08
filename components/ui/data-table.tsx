import React from 'react';

interface DataTableProps {
  headers: string[];
  children: React.ReactNode;
}

const DataTable = ({ headers, children }: DataTableProps) => {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-[#F3F3F3] shadow-[0px_0px_8px_rgba(0,0,0,0.08)]">
      <div className="overflow-x-auto">
        <table className="w-full text-right min-w-[800px]">
          <thead className="bg-[#F8F8F2] border-b border-[#F3F4F6]">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="px-4 py-4 text-xs font-medium text-[#3E421C] whitespace-nowrap text-center">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F3F3F3] bg-white">
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
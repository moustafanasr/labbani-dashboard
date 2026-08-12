"use client";

import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import { useBranches, useDeleteBranch, useCreateBranch, useUpdateBranch } from '@/hooks/use-branches';
import { formatCurrency } from '@/lib/utils';
import StatusBadge from '@/components/ui/status-badge';
import DataTable from '@/components/ui/data-table';
import Modal from '@/components/ui/modal';
import BranchForm from './branch-form';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import DeleteConfirmModal from '@/components/ui/delete-confirm-modal';
import { Eye, Pencil, Trash2, Store } from 'lucide-react';
import { Branch } from '@/types/branch';

const BranchesTable = () => {
  const { data, isLoading } = useBranches();
  const branches = useMemo(() => Array.isArray(data) ? data : [], [data]);
  
  const deleteMutation = useDeleteBranch();
  const createMutation = useCreateBranch();
  const updateMutation = useUpdateBranch();

  const [globalFilter, setGlobalFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [viewingBranch, setViewingBranch] = useState<Branch | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState<string | null>(null);

  // ✅ استخراج المدن الفريدة (تم نقله إلى الأعلى وبعده مباشرة عن الـ state)
  const uniqueCities = useMemo(() => Array.from(new Set(branches.map(b => b.city).filter(Boolean))), [branches]);

  const handleDeleteClick = (id: string) => {
    setBranchToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (branchToDelete) {
      deleteMutation.mutate(branchToDelete);
      setIsDeleteModalOpen(false);
      setBranchToDelete(null);
    }
  };

  const columns = useMemo<ColumnDef<Branch>[]>(
    () => [
      { accessorKey: 'name', header: 'اسم الفرع', cell: ({ row }) => (
          <div className="flex items-center gap-3 justify-end">
            <span className="text-sm font-medium text-[#1C1C1C]">{row.original.name}</span>
            <Store className="w-5 h-5 text-[#3E421C] hidden sm:block" />
          </div>
        ),
      },
      { accessorKey: 'city', header: 'المدينة', cell: ({ row }) => <span className="text-sm text-[#666666]">{row.original.city}</span> },
      { accessorKey: 'manager', header: 'المدير', cell: ({ row }) => <span className="text-sm text-[#666666]">{row.original.manager}</span> },
      { accessorKey: 'productCount', header: 'عدد المنتجات', cell: ({ row }) => <span className="text-sm text-[#1C1C1C]">{row.original.productCount}</span> },
      { accessorKey: 'sales', header: 'المبيعات', cell: ({ row }) => <span className="text-sm text-[#1C1C1C]">{formatCurrency(row.original.sales || 0)}</span> },
      { accessorKey: 'isActive', header: 'الحالة', cell: ({ row }) => (
          <StatusBadge status={row.original.isActive === false ? 'closed' : 'open'} label={row.original.isActive ? 'مفتوح' : 'مغلق'} />
        ),
      },
      { accessorKey: 'lastUpdated', header: 'آخر تحديث', cell: ({ row }) => <span className="text-sm text-[#666666]">{row.original.lastUpdated || '-'}</span> },
      { id: 'actions', cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <button onClick={() => handleDeleteClick(row.original.id)} className="p-1.5 text-[#A1A1A1] hover:text-[#DD404B]">
              <Trash2 className="w-4 h-4" />
            </button>
            <button onClick={() => { setEditingBranch(row.original); setIsModalOpen(true); }} className="p-1.5 text-[#A1A1A1] hover:text-[#3E421C]">
              <Pencil className="w-4 h-4" />
            </button>
            <button onClick={() => setViewingBranch(row.original)} className="p-1.5 text-[#A1A1A1] hover:text-[#3E421C]">
              <Eye className="w-4 h-4" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  // ✅ تطبيق الفلاتر
  const filteredData = useMemo(() => {
    return branches.filter((branch) => {
      const matchesGlobal = !globalFilter || 
        branch.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
        branch.city.toLowerCase().includes(globalFilter.toLowerCase());
      
      const matchesCity = !cityFilter || branch.city === cityFilter;
      const matchesStatus = !statusFilter || 
        (statusFilter === 'open' ? branch.isActive : !branch.isActive);

      return matchesGlobal && matchesCity && matchesStatus;
    });
  }, [branches, globalFilter, cityFilter, statusFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  const handleSaveBranch = async (formData: any) => {
    if (editingBranch) {
      await updateMutation.mutateAsync({ id: editingBranch.id, ...formData });
    } else {
      await createMutation.mutateAsync(formData);
    }
    setIsModalOpen(false);
    setEditingBranch(null);
  };

  if (isLoading) {
    return <div className="text-center py-10 text-[#A1A1A1]">جاري تحميل البيانات...</div>;
  }

  return (
    <>
      {/* فلتر المدينة */}
      <div className="mb-4 flex gap-4">
        <div className="w-1/3">
          <select 
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="w-full border border-[#E2E2E2] rounded-lg px-3 py-2 text-sm"
          >
            <option value="">كل المدن</option>
            {uniqueCities.map(city => <option key={city} value={city}>{city}</option>)}
          </select>
        </div>
        <div className="w-1/3">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full border border-[#E2E2E2] rounded-lg px-3 py-2 text-sm"
          >
            <option value="">كل الحالات</option>
            <option value="open">مفتوح</option>
            <option value="closed">مغلق</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <Input 
          placeholder="بحث باسم الفرع أو المدينة..." 
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>

      <DataTable headers={['اسم الفرع', 'المدينة', 'المدير', 'عدد المنتجات', 'المبيعات', 'الحالة', 'آخر تحديث', '']}>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="hover:bg-[#F8F8F2] transition-colors">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="px-4 sm:px-6 py-4 whitespace-nowrap">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </DataTable>

      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-2 text-sm text-[#666666]">
          <span>عرض</span>
          <select 
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="border border-[#E2E2E2] rounded px-2 py-1"
          >
            {[5, 10, 15, 20].map(pageSize => <option key={pageSize} value={pageSize}>{pageSize}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="px-3 py-1 border border-[#E2E2E2] rounded text-sm disabled:opacity-50">
            السابق
          </button>
          <span className="text-sm text-[#666666]">{table.getState().pagination.pageIndex + 1} من {table.getPageCount()}</span>
          <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="px-3 py-1 border border-[#E2E2E2] rounded text-sm disabled:opacity-50">
            التالي
          </button>
        </div>
      </div>

      <DeleteConfirmModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} title="تأكيد الحذف" message="هل أنت متأكد من حذف هذا الفرع؟ لا يمكن التراجع عن هذا الإجراء." />

      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingBranch(null); }} title={editingBranch ? 'تعديل الفرع' : 'إضافة فرع جديد'}>
        <BranchForm initialData={editingBranch} onSave={handleSaveBranch} onCancel={() => { setIsModalOpen(false); setEditingBranch(null); }} />
      </Modal>

      <Modal isOpen={!!viewingBranch} onClose={() => setViewingBranch(null)} title="تفاصيل الفرع">
        {viewingBranch && (
          <div className="space-y-3 text-right">
            <div className="flex justify-between border-b pb-2"><span className="font-medium">الاسم:</span><span>{viewingBranch.name}</span></div>
            <div className="flex justify-between border-b pb-2"><span className="font-medium">المدينة:</span><span>{viewingBranch.city}</span></div>
            <div className="flex justify-between border-b pb-2"><span className="font-medium">المدير:</span><span>{viewingBranch.manager}</span></div>
            <div className="flex justify-between border-b pb-2"><span className="font-medium">الحالة:</span><StatusBadge status={viewingBranch.isActive ? 'open' : 'closed'} label={viewingBranch.isActive ? 'مفتوح' : 'مغلق'} /></div>
            <Button className="w-full mt-4" onClick={() => setViewingBranch(null)}>إغلاق</Button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default BranchesTable;
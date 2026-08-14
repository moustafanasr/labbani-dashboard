"use client";

import React, { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
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
  const t = useTranslations('Branches');
  
  // ✅ State للبحث والفلاتر والـ View Mode
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [cityFilter, setCityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table'); // ✅ View Mode

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [viewingBranch, setViewingBranch] = useState<Branch | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState<string | null>(null);

  const { data, isLoading } = useBranches(page, 50, searchTerm, 'desc');
  const branches = useMemo(() => Array.isArray(data) ? data : [], [data]);
  
  const deleteMutation = useDeleteBranch();
  const createMutation = useCreateBranch();
  const updateMutation = useUpdateBranch();

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
      { accessorKey: 'name', header: t('table.name') },
      { accessorKey: 'city', header: t('table.city') },
      { accessorKey: 'manager', header: t('table.manager') },
      { accessorKey: 'productCount', header: t('table.productCount') },
      { accessorKey: 'sales', header: t('table.sales') },
      { 
        accessorKey: 'isActive', 
        header: t('table.status'),
        cell: ({ row }) => (
          <StatusBadge 
            status={row.original.isActive === false ? 'closed' : 'open'} 
            label={row.original.isActive ? t('status.open') : t('status.closed')} 
          />
        ),
      },
      { accessorKey: 'lastUpdated', header: t('table.lastUpdated') },
      { 
        id: 'actions',
        cell: ({ row }) => (
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
    [t]
  );

  // ✅ الفلترة المحلية
  const filteredData = useMemo(() => {
    return branches.filter((branch) => {
      const matchesCity = !cityFilter || branch.city === cityFilter;
      const matchesStatus = !statusFilter || 
        (statusFilter === 'open' ? branch.isActive : !branch.isActive);
      return matchesCity && matchesStatus;
    });
  }, [branches, cityFilter, statusFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
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
      {/* ✅ التبديل بين عرض الجدول والبطاقات + الفلاتر */}
      <div className="mb-4 flex flex-wrap justify-between items-center gap-4">
        
        {/* أزرار التبديل */}
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('table')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              viewMode === 'table' ? 'bg-[#3E421C] text-white' : 'bg-[#F3F3F3] text-[#1C1C1C]'
            }`}
          >
            جدول
          </button>
          <button
            onClick={() => setViewMode('card')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              viewMode === 'card' ? 'bg-[#3E421C] text-white' : 'bg-[#F3F3F3] text-[#1C1C1C]'
            }`}
          >
            بطاقات
          </button>
        </div>

        {/* فلاتر المدينة والحالة */}
        <div className="flex flex-wrap gap-4">
          <div className="w-full sm:w-40">
            <select 
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full border border-[#E2E2E2] rounded-lg px-3 py-2 text-sm bg-white"
            >
              <option value="">كل المدن</option>
              {uniqueCities.map(city => <option key={city} value={city}>{city}</option>)}
            </select>
          </div>
          <div className="w-full sm:w-40">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-[#E2E2E2] rounded-lg px-3 py-2 text-sm bg-white"
            >
              <option value="">كل الحالات</option>
              <option value="open">مفتوح</option>
              <option value="closed">مغلق</option>
            </select>
          </div>

          {/* ✅ زر إعادة ضبط الفلاتر */}
          <button
            onClick={() => {
              setCityFilter('');
              setStatusFilter('');
              setSearchTerm('');
            }}
            className="px-4 py-2 text-sm bg-[#F3F3F3] text-[#1C1C1C] rounded-lg hover:bg-[#E2E2E2] transition-colors"
          >
            إعادة ضبط
          </button>
        </div>
      </div>

      {/* ✅ حقل البحث */}
      <div className="mb-4">
        <Input 
          placeholder={t('searchPlaceholder')} 
          value={searchTerm ?? ''}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* ✅ عرض الجدول أو البطاقات */}
      {viewMode === 'table' ? (
        <DataTable headers={[t('table.name'), t('table.city'), t('table.manager'), t('table.productCount'), t('table.sales'), t('table.status'), t('table.lastUpdated'), '']}>
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
      ) : (
        // ✅ عرض البطاقات
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredData.map((branch) => (
            <div key={branch.id} className="bg-white p-4 rounded-xl border border-[#F3F3F3] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-[#1C1C1C]">{branch.name}</h3>
                <StatusBadge status={branch.isActive ? 'open' : 'closed'} label={branch.isActive ? t('status.open') : t('status.closed')} />
              </div>
              <p className="text-sm text-[#666666] mb-1"><span className="font-medium">المدينة:</span> {branch.city}</p>
              <p className="text-sm text-[#666666] mb-1"><span className="font-medium">المدير:</span> {branch.manager}</p>
              <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-[#F3F3F3]">
                <button onClick={() => handleDeleteClick(branch.id)} className="p-1.5 text-[#A1A1A1] hover:text-[#DD404B]"><Trash2 className="w-4 h-4" /></button>
                <button onClick={() => { setEditingBranch(branch); setIsModalOpen(true); }} className="p-1.5 text-[#A1A1A1] hover:text-[#3E421C]"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => setViewingBranch(branch)} className="p-1.5 text-[#A1A1A1] hover:text-[#3E421C]"><Eye className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* الترقيم */}
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
            {t('buttons.previous')}
          </button>
          <span className="text-sm text-[#666666]">{table.getState().pagination.pageIndex + 1} من {table.getPageCount()}</span>
          <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="px-3 py-1 border border-[#E2E2E2] rounded text-sm disabled:opacity-50">
            {t('buttons.next')}
          </button>
        </div>
      </div>

      {/* المودالات */}
      <DeleteConfirmModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} title={t('buttons.delete')} message="هل أنت متأكد من حذف هذا الفرع؟ لا يمكن التراجع عن هذا الإجراء." />
      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingBranch(null); }} title={editingBranch ? t('buttons.edit') : t('addBranch')}>
        <BranchForm initialData={editingBranch} onSave={handleSaveBranch} onCancel={() => { setIsModalOpen(false); setEditingBranch(null); }} />
      </Modal>
      <Modal isOpen={!!viewingBranch} onClose={() => setViewingBranch(null)} title={t('buttons.view')}>
        {viewingBranch && (
          <div className="space-y-3 text-right">
            <div className="flex justify-between border-b pb-2"><span className="font-medium">{t('table.name')}:</span><span>{viewingBranch.name}</span></div>
            <div className="flex justify-between border-b pb-2"><span className="font-medium">{t('table.city')}:</span><span>{viewingBranch.city}</span></div>
            <div className="flex justify-between border-b pb-2"><span className="font-medium">{t('table.manager')}:</span><span>{viewingBranch.manager}</span></div>
            <div className="flex justify-between border-b pb-2"><span className="font-medium">{t('table.status')}:</span><StatusBadge status={viewingBranch.isActive ? 'open' : 'closed'} label={viewingBranch.isActive ? t('status.open') : t('status.closed')} /></div>
            <Button className="w-full mt-4" onClick={() => setViewingBranch(null)}>إغلاق</Button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default BranchesTable;
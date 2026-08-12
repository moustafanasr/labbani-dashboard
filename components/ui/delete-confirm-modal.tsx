"use client";

import React from 'react';
import Modal from './modal';
import Button from './button';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'تأكيد الحذف',
  message = 'هل أنت متأكد من حذف هذا العنصر؟ لا يمكن التراجع عن هذا الإجراء.',
}: DeleteConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="text-center">
        <p className="text-sm text-[#666666] mb-6">{message}</p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={onClose}>إلغاء</Button>
          <Button variant="danger" onClick={onConfirm}>حذف</Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
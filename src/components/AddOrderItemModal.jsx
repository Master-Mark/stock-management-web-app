
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const AddOrderItemModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    title: '', sku: '', quantity: 1, unitPrice: 0
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
    else setFormData({ title: '', sku: '', quantity: 1, unitPrice: 0 });
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, lineTotal: formData.quantity * formData.unitPrice });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Item' : 'Add Item'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Product Title</Label>
            <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
          </div>
          <div className="space-y-2">
            <Label>SKU</Label>
            <Input value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Quantity</Label>
              <Input type="number" min="1" value={formData.quantity} onChange={e => setFormData({...formData, quantity: Number(e.target.value)})} required />
            </div>
            <div className="space-y-2">
              <Label>Unit Price ($)</Label>
              <Input type="number" step="0.01" min="0" value={formData.unitPrice} onChange={e => setFormData({...formData, unitPrice: Number(e.target.value)})} required />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save Item</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddOrderItemModal;

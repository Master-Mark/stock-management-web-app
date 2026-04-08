
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const AddTimelineEntryModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({ message: '', type: 'note_added' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      timestamp: new Date().toISOString(),
      creator: 'Admin User'
    });
    setFormData({ message: '', type: 'note_added' });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Timeline Entry</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Message</Label>
            <Textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} required />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Add Entry</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTimelineEntryModal;

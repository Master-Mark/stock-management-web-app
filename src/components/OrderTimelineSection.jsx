
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import AddTimelineEntryModal from './AddTimelineEntryModal.jsx';

const OrderTimelineSection = ({ timeline = [], onUpdateTimeline }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (entry) => {
    onUpdateTimeline([{ ...entry, id: `TL-${Date.now()}` }, ...timeline]);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Timeline</CardTitle>
        <Button size="sm" variant="outline" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> Add Note
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timeline.map(entry => (
            <div key={entry.id} className="flex gap-4 text-sm">
              <div className="w-2 h-2 mt-1.5 rounded-full bg-primary shrink-0" />
              <div>
                <p className="font-medium text-foreground">{entry.message}</p>
                <p className="text-muted-foreground text-xs">
                  {new Date(entry.timestamp).toLocaleString()} by {entry.creator}
                </p>
              </div>
            </div>
          ))}
          {timeline.length === 0 && (
            <p className="text-muted-foreground text-sm text-center py-4">No timeline events yet.</p>
          )}
        </div>
      </CardContent>
      <AddTimelineEntryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
    </Card>
  );
};

export default OrderTimelineSection;

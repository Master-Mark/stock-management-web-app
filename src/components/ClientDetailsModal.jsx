import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, User, Building2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const DetailRow = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-border last:border-0">
    <span className="text-sm text-muted-foreground font-medium">{label}</span>
    <span className="text-sm text-foreground sm:text-right sm:max-w-[60%]">
      {value || '-'}
    </span>
  </div>
);

const ClientDetailsModal = ({ isOpen, onClose, client, onEdit }) => {
  if (!client) return null;

  const displayName =
    client.type === 'Individual'
      ? `${client.firstName} ${client.lastName}`
      : client.businessName;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b border-border">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {client.type === 'Individual' ? (
                  <User className="w-6 h-6" />
                ) : (
                  <Building2 className="w-6 h-6" />
                )}
              </div>
              <div>
                <DialogTitle className="text-xl mb-1">
                  {displayName}
                </DialogTitle>
                <div className="flex items-center gap-2">
                  <p className="font-mono text-sm text-muted-foreground">
                    {client.id}
                  </p>
                  <Badge variant="secondary">{client.type}</Badge>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(client)}
              className="gap-2">
              <Edit className="w-4 h-4" /> Edit
            </Button>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6 py-4">
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3 text-foreground">
                Contact Information
              </h4>
              <div className="bg-card rounded-lg border border-border px-4">
                {client.type === 'Business' && (
                  <DetailRow
                    label="Business Name"
                    value={client.businessName}
                  />
                )}
                {client.type === 'Business' && (
                  <DetailRow
                    label="Contact Person"
                    value={client.contactPerson}
                  />
                )}
                {client.type === 'Business' && (
                  <DetailRow label="Business VAT" value={client.businessVAT} />
                )}
                <DetailRow label="Email" value={client.email} />
                <DetailRow label="Phone" value={client.phone} />
                <DetailRow
                  label="Alternate Phone"
                  value={client.alternatePhone}
                />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-foreground">Address</h4>
              <div className="bg-card rounded-lg border border-border px-4">
                <DetailRow label="Address Line 1" value={client.addressLine1} />
                <DetailRow label="Address Line 2" value={client.addressLine2} />
                <DetailRow label="Suburb" value={client.suburb} />
                <DetailRow label="City" value={client.city} />
                <DetailRow label="State / Province" value={client.province} />
                <DetailRow label="Postal Code" value={client.postalCode} />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-foreground">
                Order History
              </h4>
              <div className="bg-card rounded-lg border border-border px-4">
                <DetailRow label="Total Orders" value={client.totalOrders} />
                <DetailRow
                  label="Total Spent"
                  value={`$${Number(client.totalSpent || 0).toFixed(2)}`}
                />
              </div>
            </div>

            {client.notes && (
              <div>
                <h4 className="font-semibold mb-3 text-foreground">Notes</h4>
                <div className="bg-muted/50 rounded-lg p-4 text-sm text-foreground">
                  {client.notes}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ClientDetailsModal;

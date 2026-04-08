
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash2 } from 'lucide-react';
import AddPaymentModal from './AddPaymentModal.jsx';

const OrderPaymentsSection = ({ payments = [], onUpdatePayments }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (payment) => {
    onUpdatePayments([...payments, { ...payment, id: `PAY-${Date.now()}` }]);
  };

  const handleDelete = (id) => {
    if (confirm('Remove this payment?')) {
      onUpdatePayments(payments.filter(p => p.id !== id));
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Payments</CardTitle>
        <Button size="sm" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> Add Payment
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map(payment => (
              <TableRow key={payment.id}>
                <TableCell>{payment.date}</TableCell>
                <TableCell className="capitalize">{payment.method.replace('_', ' ')}</TableCell>
                <TableCell className="text-right font-medium">${payment.amount.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(payment.id)}><Trash2 className="w-4 h-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
            {payments.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-4">No payments recorded.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <AddPaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
    </Card>
  );
};

export default OrderPaymentsSection;

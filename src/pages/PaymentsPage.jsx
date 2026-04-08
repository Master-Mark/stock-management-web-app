
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Search, Filter } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import ActionMenu from '@/components/ActionMenu.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const PaymentsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with API call
  const payments = [
    { id: 'PAY-1847', orderId: 'ORD-2843', client: 'Lars Bergström', amount: '$324.00', method: 'Credit Card', status: 'Completed', date: '2026-04-05' },
    { id: 'PAY-1846', orderId: 'ORD-2847', client: 'Kai Nakamura', amount: '$487.00', method: 'Bank Transfer', status: 'Completed', date: '2026-04-07' },
    { id: 'PAY-1845', orderId: 'ORD-2846', client: 'Elena Vasquez', amount: '$312.00', method: 'Credit Card', status: 'Pending', date: '2026-04-07' },
    { id: 'PAY-1844', orderId: 'ORD-2845', client: 'Dmitri Volkov', amount: '$213.00', method: 'Cash', status: 'Completed', date: '2026-04-06' },
    { id: 'PAY-1843', orderId: 'ORD-2841', client: 'Carlos Mendez', amount: '$542.00', method: 'Credit Card', status: 'Completed', date: '2026-04-04' },
    { id: 'PAY-1842', orderId: 'ORD-2839', client: 'Marcus Chen', amount: '$234.00', method: 'PayPal', status: 'Completed', date: '2026-04-03' },
    { id: 'PAY-1841', orderId: 'ORD-2838', client: 'Sofia Andersson', amount: '$334.00', method: 'Bank Transfer', status: 'Processing', date: '2026-04-03' },
    { id: 'PAY-1840', orderId: 'ORD-2837', client: 'Raj Patel', amount: '$189.00', method: 'Credit Card', status: 'Completed', date: '2026-04-02' },
    { id: 'PAY-1839', orderId: 'ORD-2836', client: 'Lucia Torres', amount: '$143.00', method: 'Cash', status: 'Completed', date: '2026-04-02' },
    { id: 'PAY-1838', orderId: 'ORD-2842', client: 'Priya Sharma', amount: '$267.00', method: 'Credit Card', status: 'Failed', date: '2026-04-05' }
  ];

  const filteredPayments = payments.filter(payment =>
    payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const config = {
      'Completed': 'bg-green-100 text-green-800 hover:bg-green-100',
      'Pending': 'bg-amber-100 text-amber-800 hover:bg-amber-100',
      'Processing': 'bg-blue-100 text-blue-800 hover:bg-blue-100',
      'Failed': 'bg-red-100 text-red-800 hover:bg-red-100'
    };
    return <Badge className={config[status] || config['Pending']}>{status}</Badge>;
  };

  return (
    <>
      <Helmet>
        <title>Payments - American V8 Muscle Parts Admin</title>
        <meta name="description" content="Track and manage payment transactions" />
      </Helmet>

      <DashboardLayout pageTitle="Payments">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search payments by ID, order, or client..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>

        {/* Payments Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-foreground">Payment ID</TableHead>
                    <TableHead className="text-foreground">Order ID</TableHead>
                    <TableHead className="text-foreground">Client</TableHead>
                    <TableHead className="text-foreground text-right">Amount</TableHead>
                    <TableHead className="text-foreground">Payment Method</TableHead>
                    <TableHead className="text-foreground">Status</TableHead>
                    <TableHead className="text-foreground">Date</TableHead>
                    <TableHead className="text-foreground"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium text-foreground">{payment.id}</TableCell>
                      <TableCell className="text-foreground">{payment.orderId}</TableCell>
                      <TableCell className="text-foreground">{payment.client}</TableCell>
                      <TableCell className="text-right font-medium text-foreground">{payment.amount}</TableCell>
                      <TableCell className="text-muted-foreground">{payment.method}</TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      <TableCell className="text-muted-foreground">{payment.date}</TableCell>
                      <TableCell>
                        <ActionMenu
                          onView={() => toast('View payment details')}
                          onEdit={() => toast('Edit payment')}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {filteredPayments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No payments found matching your search.</p>
          </div>
        )}
      </DashboardLayout>
    </>
  );
};

export default PaymentsPage;

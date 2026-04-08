
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useOrders } from '@/hooks/useOrders.js';
import OrderItemsSection from '@/components/OrderItemsSection.jsx';
import OrderPaymentsSection from '@/components/OrderPaymentsSection.jsx';
import OrderTimelineSection from '@/components/OrderTimelineSection.jsx';

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { getOrderById, updateOrder } = useOrders();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const found = getOrderById(orderId);
    if (found) setOrder(found);
    else navigate('/orders');
  }, [orderId, getOrderById, navigate]);

  if (!order) return null;

  const handleUpdateItems = (newItems) => {
    const total = newItems.reduce((sum, item) => sum + item.lineTotal, 0);
    const updated = { ...order, items: newItems, totalAmount: total, balanceDue: total - order.depositAmount };
    setOrder(updated);
    updateOrder(order.id, updated);
    toast.success('Items updated');
  };

  const handleUpdatePayments = (newPayments) => {
    const paid = newPayments.reduce((sum, p) => sum + p.amount, 0);
    const updated = { ...order, payments: newPayments, depositAmount: paid, balanceDue: order.totalAmount - paid };
    setOrder(updated);
    updateOrder(order.id, updated);
    toast.success('Payments updated');
  };

  const handleUpdateTimeline = (newTimeline) => {
    const updated = { ...order, timeline: newTimeline };
    setOrder(updated);
    updateOrder(order.id, updated);
    toast.success('Timeline updated');
  };

  return (
    <>
      <Helmet>
        <title>Order {order.id} - Admin</title>
      </Helmet>
      <DashboardLayout pageTitle={`Order ${order.id}`}>
        <div className="mb-6 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/orders')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{order.id}</h2>
            <div className="flex gap-2 mt-1">
              <Badge className={`badge-status-${order.status.replace('_', '-')}`}>{order.status.replace('_', ' ')}</Badge>
              <Badge className={`badge-payment-${order.paymentStatus}`}>{order.paymentStatus}</Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <OrderItemsSection items={order.items} onUpdateItems={handleUpdateItems} />
            <OrderPaymentsSection payments={order.payments} onUpdatePayments={handleUpdatePayments} />
            <OrderTimelineSection timeline={order.timeline} onUpdateTimeline={handleUpdateTimeline} />
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle>Summary</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Total</span><span className="font-medium">${order.totalAmount.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Paid</span><span className="font-medium">${order.depositAmount.toFixed(2)}</span></div>
                <div className="flex justify-between border-t pt-2"><span className="font-medium">Balance Due</span><span className="font-bold text-primary">${order.balanceDue.toFixed(2)}</span></div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Client Details</CardTitle></CardHeader>
              <CardContent className="space-y-1 text-sm">
                <p className="font-medium">{order.clientName}</p>
                <p className="text-muted-foreground">{order.clientPhone}</p>
                <p className="text-muted-foreground">{order.clientEmail}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Supplier Details</CardTitle></CardHeader>
              <CardContent className="space-y-1 text-sm">
                <p className="font-medium">{order.supplier}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default OrderDetailsPage;

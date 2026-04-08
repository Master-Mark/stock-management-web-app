
import React from 'react';
import { Helmet } from 'react-helmet';
import { Package, Users, Truck, ShoppingCart, CreditCard, PackageCheck, Clock, Plus } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import StatCard from '@/components/StatCard.jsx';
import OrderStatusBadge from '@/components/OrderStatusBadge.jsx';
import StockLevelIndicator from '@/components/StockLevelIndicator.jsx';
import ActionMenu from '@/components/ActionMenu.jsx';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';

const DashboardPage = () => {
  // Mock data - replace with API calls
  const stats = [
    { icon: Package, label: 'Total Products', value: '1,247', trend: 'up', trendValue: '+12% from last month' },
    { icon: Users, label: 'Total Clients', value: '342', trend: 'up', trendValue: '+8% from last month' },
    { icon: Truck, label: 'Total Suppliers', value: '67', trend: 'neutral', trendValue: 'No change' },
    { icon: ShoppingCart, label: 'Active Orders', value: '89', trend: 'up', trendValue: '+15% from last week' },
    { icon: CreditCard, label: 'Awaiting Payment', value: '23', trend: 'down', trendValue: '-5% from last week' },
    { icon: PackageCheck, label: 'In Transit', value: '34', trend: 'up', trendValue: '+7% from last week' },
    { icon: Clock, label: 'Ready for Collection', value: '12', trend: 'neutral', trendValue: 'No change' }
  ];

  const recentOrders = [
    { id: 'ORD-2847', client: 'Kai Nakamura', product: 'Holley 4-Barrel Carburetor 600 CFM', status: 'In Transit', date: '2026-04-07', amount: '$487.00' },
    { id: 'ORD-2846', client: 'Elena Vasquez', product: 'Small Block Chevy Main Bearing Kit', status: 'Awaiting Payment', date: '2026-04-07', amount: '$156.00' },
    { id: 'ORD-2845', client: 'Dmitri Volkov', product: 'Ford 351W Complete Gasket Set', status: 'Ready for Collection', date: '2026-04-06', amount: '$213.00' },
    { id: 'ORD-2844', client: 'Amara Okonkwo', product: 'Big Block Chevy Cam Bearing Set', status: 'Active', date: '2026-04-06', amount: '$178.00' },
    { id: 'ORD-2843', client: 'Lars Bergström', product: 'Mustang 5.0L Piston Ring Set', status: 'Completed', date: '2026-04-05', amount: '$324.00' },
    { id: 'ORD-2842', client: 'Priya Sharma', product: 'Mopar 440 Timing Chain Kit', status: 'Delayed', date: '2026-04-05', amount: '$267.00' },
    { id: 'ORD-2841', client: 'Carlos Mendez', product: 'Edelbrock Intake Manifold SBC', status: 'In Transit', date: '2026-04-04', amount: '$542.00' },
    { id: 'ORD-2840', client: 'Yuki Tanaka', product: 'Holley Fuel Pump 110 GPH', status: 'Active', date: '2026-04-04', amount: '$198.00' }
  ];

  const lowStockProducts = [
    { name: 'Small Block Chevy Main Bearing Kit', current: 8, reorderLevel: 20 },
    { name: 'Ford 351W Head Gasket Set', current: 12, reorderLevel: 25 },
    { name: 'Holley Carburetor Rebuild Kit', current: 15, reorderLevel: 30 },
    { name: 'Big Block Chevy Cam Bearings', current: 6, reorderLevel: 15 }
  ];

  const delayedOrders = [
    { id: 'ORD-2842', client: 'Priya Sharma', dueDate: '2026-04-03', status: 'Delayed' },
    { id: 'ORD-2831', client: 'Marcus Chen', dueDate: '2026-04-02', status: 'Delayed' },
    { id: 'ORD-2827', client: 'Sofia Andersson', dueDate: '2026-04-01', status: 'Delayed' }
  ];

  const recentActivity = [
    { action: 'New order placed', client: 'Kai Nakamura', time: '2 hours ago' },
    { action: 'Payment received', client: 'Elena Vasquez', time: '4 hours ago' },
    { action: 'Order shipped', client: 'Dmitri Volkov', time: '5 hours ago' },
    { action: 'New client registered', client: 'Amara Okonkwo', time: '1 day ago' }
  ];

  const handleQuickAction = (action) => {
    toast(`${action} feature coming soon`);
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - American V8 Muscle Parts Admin</title>
        <meta name="description" content="Admin dashboard for American V8 Muscle Parts inventory and order management" />
      </Helmet>

      <DashboardLayout pageTitle="Dashboard">
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Button onClick={() => handleQuickAction('Add Product')} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
          <Button onClick={() => handleQuickAction('Add Client')} variant="secondary" className="gap-2">
            <Plus className="w-4 h-4" />
            Add Client
          </Button>
          <Button onClick={() => handleQuickAction('Add Supplier')} variant="secondary" className="gap-2">
            <Plus className="w-4 h-4" />
            Add Supplier
          </Button>
          <Button onClick={() => handleQuickAction('Create Order')} variant="secondary" className="gap-2">
            <Plus className="w-4 h-4" />
            Create Order
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders - Takes 2 columns */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-foreground">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-foreground">Order ID</TableHead>
                      <TableHead className="text-foreground">Client</TableHead>
                      <TableHead className="text-foreground">Product</TableHead>
                      <TableHead className="text-foreground">Status</TableHead>
                      <TableHead className="text-foreground">Date</TableHead>
                      <TableHead className="text-foreground text-right">Amount</TableHead>
                      <TableHead className="text-foreground"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium text-foreground">{order.id}</TableCell>
                        <TableCell className="text-foreground">{order.client}</TableCell>
                        <TableCell className="text-foreground max-w-xs truncate">{order.product}</TableCell>
                        <TableCell>
                          <OrderStatusBadge status={order.status} />
                        </TableCell>
                        <TableCell className="text-muted-foreground">{order.date}</TableCell>
                        <TableCell className="text-right font-medium text-foreground">{order.amount}</TableCell>
                        <TableCell>
                          <ActionMenu
                            onView={() => toast('View order details')}
                            onEdit={() => toast('Edit order')}
                            onDelete={() => toast('Delete order')}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex flex-col gap-1 pb-4 border-b border-border last:border-0 last:pb-0">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.client}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Low Stock Products */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-foreground">Low Stock Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lowStockProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between pb-4 border-b border-border last:border-0 last:pb-0">
                    <div className="flex-1">
                      <p className="font-medium text-foreground mb-1">{product.name}</p>
                      <p className="text-sm text-muted-foreground">Reorder level: {product.reorderLevel} units</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <StockLevelIndicator current={product.current} reorderLevel={product.reorderLevel} />
                      <Button size="sm" variant="outline">Reorder</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Delayed Orders */}
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Delayed Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {delayedOrders.map((order) => (
                  <div key={order.id} className="flex flex-col gap-1 pb-4 border-b border-border last:border-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">{order.id}</p>
                      <OrderStatusBadge status={order.status} />
                    </div>
                    <p className="text-sm text-muted-foreground">{order.client}</p>
                    <p className="text-xs text-muted-foreground">Due: {order.dueDate}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
};

export default DashboardPage;

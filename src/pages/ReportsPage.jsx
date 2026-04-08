
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { TrendingUp, DollarSign, Package, Users, Download, Calendar } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import StatCard from '@/components/StatCard.jsx';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CardGridSkeleton, TableSkeleton } from '@/components/LoadingSkeletons.jsx';

const ReportsPage = () => {
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('this_month');

  // Simulate API fetch
  useEffect(() => {
    setLoading(true);
    // TODO: Replace with actual API call to fetch reports data
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [dateRange]);

  const monthlyStats = [
    { icon: DollarSign, label: 'Total Revenue', value: '$47,234', trend: 'up', trendValue: '+18% from last month' },
    { icon: Package, label: 'Products Sold', value: '1,847', trend: 'up', trendValue: '+12% from last month' },
    { icon: Users, label: 'New Clients', value: '67', trend: 'up', trendValue: '+23% from last month' },
    { icon: TrendingUp, label: 'Average Order Value', value: '$256', trend: 'up', trendValue: '+8% from last month' }
  ];

  const salesData = [
    { name: 'Week 1', paid: 4000, unpaid: 2400 },
    { name: 'Week 2', paid: 3000, unpaid: 1398 },
    { name: 'Week 3', paid: 2000, unpaid: 9800 },
    { name: 'Week 4', paid: 2780, unpaid: 3908 },
  ];

  const topProducts = [
    { name: 'Holley 4-Barrel Carburetor 600 CFM', sales: 47, revenue: '$22,889' },
    { name: 'Small Block Chevy Main Bearing Kit', sales: 89, revenue: '$13,884' },
    { name: 'Edelbrock Intake Manifold SBC', sales: 34, revenue: '$18,428' },
  ];

  const topClients = [
    { name: 'Lars Bergström', orders: 42, spent: '$18,923' },
    { name: 'Dmitri Volkov', orders: 31, spent: '$12,456' },
    { name: 'Yuki Tanaka', orders: 27, spent: '$9,654' },
  ];

  return (
    <>
      <Helmet>
        <title>Reports & Analytics - Admin Portal</title>
      </Helmet>

      <DashboardLayout pageTitle="Reports & Analytics">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Business Analytics</h2>
            <p className="text-muted-foreground">Monitor your sales, inventory, and client metrics.</p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px] bg-background">
                <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this_month">This Month</SelectItem>
                <SelectItem value="last_30_days">Last 30 Days</SelectItem>
                <SelectItem value="this_year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button className="gap-2" onClick={() => toast.success('Report exported successfully')}>
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="space-y-6">
            <CardGridSkeleton count={4} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TableSkeleton rows={4} columns={3} />
              <TableSkeleton rows={4} columns={3} />
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {monthlyStats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Paid vs Unpaid orders over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                        <Tooltip 
                          cursor={{fill: 'hsl(var(--muted)/0.5)'}}
                          contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                        />
                        <Legend />
                        <Bar dataKey="paid" name="Paid Revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="unpaid" name="Unpaid Revenue" fill="hsl(var(--muted-foreground)/0.3)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Special Orders</CardTitle>
                  <CardDescription>Current status breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Pending Quotes</span>
                      <span className="text-sm font-bold">12</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2"><div className="bg-warning h-2 rounded-full" style={{width: '30%'}}></div></div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm font-medium">In Transit</span>
                      <span className="text-sm font-bold">8</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2"><div className="bg-info h-2 rounded-full" style={{width: '20%'}}></div></div>

                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm font-medium">Ready for Collection</span>
                      <span className="text-sm font-bold">24</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2"><div className="bg-success h-2 rounded-full" style={{width: '60%'}}></div></div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topProducts.map((product, index) => (
                      <div key={index} className="flex items-center justify-between pb-4 border-b border-border last:border-0 last:pb-0">
                        <div className="flex-1">
                          <p className="font-medium text-sm mb-1">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.sales} units sold</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm">{product.revenue}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Clients</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topClients.map((client, index) => (
                      <div key={index} className="flex items-center justify-between pb-4 border-b border-border last:border-0 last:pb-0">
                        <div className="flex-1">
                          <p className="font-medium text-sm mb-1">{client.name}</p>
                          <p className="text-xs text-muted-foreground">{client.orders} orders</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm">{client.spent}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </DashboardLayout>
    </>
  );
};

export default ReportsPage;

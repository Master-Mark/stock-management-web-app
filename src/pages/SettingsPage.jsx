
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Save, Building, User, Bell, Shield } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const SettingsPage = () => {
  const [isSaving, setIsSaving] = useState(false);

  // Form States
  const [businessSettings, setBusinessSettings] = useState({
    name: 'American V8 Muscle Parts',
    markup: 35,
    lowStock: 10,
    currency: 'USD',
    prefix: 'ORD-'
  });

  const [adminProfile, setAdminProfile] = useState({
    name: 'Marcus Rodriguez',
    email: 'admin@v8parts.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    newOrders: true,
    payments: true,
    lowStock: true,
    dailySummary: false
  });

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    // TODO: Replace with API call to save settings to database
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSaving(false);
    toast.success('Settings saved successfully');
  };

  return (
    <>
      <Helmet>
        <title>Settings - Admin Portal</title>
      </Helmet>

      <DashboardLayout pageTitle="Settings">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground">System Configuration</h2>
            <p className="text-muted-foreground">Manage your portal settings and preferences.</p>
          </div>

          <Tabs defaultValue="business" className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 h-auto gap-2 bg-transparent mb-6">
              <TabsTrigger value="business" className="data-[state=active]:bg-card data-[state=active]:shadow-sm py-2.5 border border-transparent data-[state=active]:border-border">
                <Building className="w-4 h-4 mr-2" /> Business
              </TabsTrigger>
              <TabsTrigger value="profile" className="data-[state=active]:bg-card data-[state=active]:shadow-sm py-2.5 border border-transparent data-[state=active]:border-border">
                <User className="w-4 h-4 mr-2" /> Profile
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-card data-[state=active]:shadow-sm py-2.5 border border-transparent data-[state=active]:border-border">
                <Bell className="w-4 h-4 mr-2" /> Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-card data-[state=active]:shadow-sm py-2.5 border border-transparent data-[state=active]:border-border">
                <Shield className="w-4 h-4 mr-2" /> Security
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleSave}>
              <TabsContent value="business">
                <Card>
                  <CardHeader>
                    <CardTitle>Business Settings</CardTitle>
                    <CardDescription>Configure core business operational parameters.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Business Name</Label>
                        <Input value={businessSettings.name} onChange={e => setBusinessSettings({...businessSettings, name: e.target.value})} required />
                      </div>
                      <div className="space-y-2">
                        <Label>Currency</Label>
                        <Select value={businessSettings.currency} onValueChange={v => setBusinessSettings({...businessSettings, currency: v})}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD ($)</SelectItem>
                            <SelectItem value="CAD">CAD ($)</SelectItem>
                            <SelectItem value="EUR">EUR (€)</SelectItem>
                            <SelectItem value="GBP">GBP (£)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Default Markup (%)</Label>
                        <Input type="number" value={businessSettings.markup} onChange={e => setBusinessSettings({...businessSettings, markup: Number(e.target.value)})} required />
                      </div>
                      <div className="space-y-2">
                        <Label>Low Stock Threshold</Label>
                        <Input type="number" value={businessSettings.lowStock} onChange={e => setBusinessSettings({...businessSettings, lowStock: Number(e.target.value)})} required />
                      </div>
                      <div className="space-y-2">
                        <Label>Order Number Prefix</Label>
                        <Input value={businessSettings.prefix} onChange={e => setBusinessSettings({...businessSettings, prefix: e.target.value})} required />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Admin Profile</CardTitle>
                    <CardDescription>Update your personal information.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input value={adminProfile.name} onChange={e => setAdminProfile({...adminProfile, name: e.target.value})} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Email Address</Label>
                      <Input type="email" value={adminProfile.email} onChange={e => setAdminProfile({...adminProfile, email: e.target.value})} required />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Choose what events you want to be notified about.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>New Orders</Label>
                        <p className="text-sm text-muted-foreground">Receive an email when a new order is placed.</p>
                      </div>
                      <Switch checked={notifications.newOrders} onCheckedChange={c => setNotifications({...notifications, newOrders: c})} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Payment Updates</Label>
                        <p className="text-sm text-muted-foreground">Receive an email when a payment is recorded.</p>
                      </div>
                      <Switch checked={notifications.payments} onCheckedChange={c => setNotifications({...notifications, payments: c})} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Low Stock Alerts</Label>
                        <p className="text-sm text-muted-foreground">Receive an email when items fall below threshold.</p>
                      </div>
                      <Switch checked={notifications.lowStock} onCheckedChange={c => setNotifications({...notifications, lowStock: c})} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Daily Summary</Label>
                        <p className="text-sm text-muted-foreground">Receive a daily digest of all activities.</p>
                      </div>
                      <Switch checked={notifications.dailySummary} onCheckedChange={c => setNotifications({...notifications, dailySummary: c})} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>Update your password and security settings.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Current Password</Label>
                      <Input type="password" value={adminProfile.currentPassword} onChange={e => setAdminProfile({...adminProfile, currentPassword: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>New Password</Label>
                      <Input type="password" value={adminProfile.newPassword} onChange={e => setAdminProfile({...adminProfile, newPassword: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>Confirm New Password</Label>
                      <Input type="password" value={adminProfile.confirmPassword} onChange={e => setAdminProfile({...adminProfile, confirmPassword: e.target.value})} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <div className="mt-6 flex justify-end">
                <Button type="submit" disabled={isSaving} className="gap-2">
                  {isSaving ? <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                  {isSaving ? 'Saving...' : 'Save Settings'}
                </Button>
              </div>
            </form>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default SettingsPage;

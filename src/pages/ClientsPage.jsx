
import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Search, Plus, Filter, User, Building2 } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import ActionMenu from '@/components/ActionMenu.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

import { useClients } from '@/hooks/useClients.js';
import ClientForm from '@/components/ClientForm.jsx';
import ClientDetailsModal from '@/components/ClientDetailsModal.jsx';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal.jsx';

const ClientsPage = () => {
  const { clients, addClient, updateClient, deleteClient, searchClients, filterByType } = useClients();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const filteredClients = useMemo(() => {
    let result = searchClients(searchQuery);
    result = filterByType(typeFilter, result);
    return result;
  }, [clients, searchQuery, typeFilter]);

  const handleOpenCreate = () => {
    setSelectedClient(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (client) => {
    setSelectedClient(client);
    setIsDetailsOpen(false);
    setIsFormOpen(true);
  };

  const handleOpenDetails = (client) => {
    setSelectedClient(client);
    setIsDetailsOpen(true);
  };

  const handleOpenDelete = (client) => {
    setSelectedClient(client);
    setIsDeleteOpen(true);
  };

  const handleFormSubmit = (clientData) => {
    if (selectedClient) {
      updateClient(selectedClient.id, clientData);
      toast.success('Client updated successfully');
    } else {
      addClient(clientData);
      toast.success('Client created successfully');
    }
    setIsFormOpen(false);
  };

  const handleDeleteConfirm = (id) => {
    deleteClient(id);
    toast.success('Client deleted successfully');
    setIsDeleteOpen(false);
  };

  const getDisplayName = (client) => {
    return client.type === 'Individual' ? `${client.firstName} ${client.lastName}` : client.businessName;
  };

  return (
    <>
      <Helmet>
        <title>Clients - American V8 Muscle Parts Admin</title>
        <meta name="description" content="Manage your client database and customer relationships" />
      </Helmet>

      <DashboardLayout pageTitle="Clients">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Client Management</h2>
            <p className="text-muted-foreground">Manage your individual and business clients.</p>
          </div>
          <Button onClick={handleOpenCreate} className="gap-2 w-full lg:w-auto">
            <Plus className="w-4 h-4" /> Add Client
          </Button>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search clients by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background"
            />
          </div>
          <div className="flex gap-3">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[160px] bg-background">
                <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Types</SelectItem>
                <SelectItem value="Individual">Individual</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead className="text-right">Total Orders</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No clients found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredClients.map((client) => (
                      <TableRow key={client.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium text-foreground">
                          <div className="flex items-center gap-2">
                            {client.type === 'Individual' ? <User className="w-4 h-4 text-muted-foreground" /> : <Building2 className="w-4 h-4 text-muted-foreground" />}
                            {getDisplayName(client)}
                          </div>
                        </TableCell>
                        <TableCell><Badge variant="secondary">{client.type}</Badge></TableCell>
                        <TableCell className="text-muted-foreground">{client.phone}</TableCell>
                        <TableCell className="text-muted-foreground">{client.email}</TableCell>
                        <TableCell className="text-muted-foreground">{client.city || '-'}</TableCell>
                        <TableCell className="text-right font-medium">{client.totalOrders}</TableCell>
                        <TableCell>
                          <ActionMenu
                            onView={() => handleOpenDetails(client)}
                            onEdit={() => handleOpenEdit(client)}
                            onDelete={() => handleOpenDelete(client)}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Mobile Cards View */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {filteredClients.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground bg-card rounded-xl border border-border">
              No clients found.
            </div>
          ) : (
            filteredClients.map(client => (
              <Card key={client.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      {client.type === 'Individual' ? <User className="w-4 h-4 text-muted-foreground" /> : <Building2 className="w-4 h-4 text-muted-foreground" />}
                      <h4 className="font-semibold text-foreground">{getDisplayName(client)}</h4>
                    </div>
                    <ActionMenu
                      onView={() => handleOpenDetails(client)}
                      onEdit={() => handleOpenEdit(client)}
                      onDelete={() => handleOpenDelete(client)}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="secondary">{client.type}</Badge>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>{client.phone}</p>
                    <p>{client.email}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Modals & Forms */}
        <Sheet open={isFormOpen} onOpenChange={setIsFormOpen}>
          <SheetContent side="right" className="w-full sm:max-w-xl p-0 flex flex-col">
            <SheetHeader className="px-6 py-4 border-b border-border">
              <SheetTitle>{selectedClient ? 'Edit Client' : 'Add New Client'}</SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-hidden p-6">
              <ClientForm 
                initialData={selectedClient} 
                onSubmit={handleFormSubmit} 
                onCancel={() => setIsFormOpen(false)} 
              />
            </div>
          </SheetContent>
        </Sheet>

        <ClientDetailsModal 
          isOpen={isDetailsOpen} 
          onClose={() => setIsDetailsOpen(false)} 
          client={selectedClient} 
          onEdit={handleOpenEdit}
        />

        <DeleteConfirmationModal 
          isOpen={isDeleteOpen} 
          onClose={() => setIsDeleteOpen(false)} 
          onConfirm={handleDeleteConfirm} 
          product={selectedClient ? { id: selectedClient.id, title: getDisplayName(selectedClient), sku: selectedClient.id } : null} 
        />

      </DashboardLayout>
    </>
  );
};

export default ClientsPage;

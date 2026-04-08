
import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Search, Plus, Filter, Truck } from 'lucide-react';
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

import { useSuppliers } from '@/hooks/useSuppliers.js';
import SupplierForm from '@/components/SupplierForm.jsx';
import SupplierDetailsModal from '@/components/SupplierDetailsModal.jsx';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal.jsx';

const SuppliersPage = () => {
  const { suppliers, addSupplier, updateSupplier, deleteSupplier, searchSuppliers, filterByStatus } = useSuppliers();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const filteredSuppliers = useMemo(() => {
    let result = searchSuppliers(searchQuery);
    result = filterByStatus(statusFilter, result);
    return result;
  }, [suppliers, searchQuery, statusFilter]);

  const handleOpenCreate = () => {
    setSelectedSupplier(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (supplier) => {
    setSelectedSupplier(supplier);
    setIsDetailsOpen(false);
    setIsFormOpen(true);
  };

  const handleOpenDetails = (supplier) => {
    setSelectedSupplier(supplier);
    setIsDetailsOpen(true);
  };

  const handleOpenDelete = (supplier) => {
    setSelectedSupplier(supplier);
    setIsDeleteOpen(true);
  };

  const handleFormSubmit = (supplierData) => {
    if (selectedSupplier) {
      updateSupplier(selectedSupplier.id, supplierData);
      toast.success('Supplier updated successfully');
    } else {
      addSupplier(supplierData);
      toast.success('Supplier created successfully');
    }
    setIsFormOpen(false);
  };

  const handleDeleteConfirm = (id) => {
    deleteSupplier(id);
    toast.success('Supplier deleted successfully');
    setIsDeleteOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Suppliers - American V8 Muscle Parts Admin</title>
        <meta name="description" content="Manage your supplier relationships and procurement" />
      </Helmet>

      <DashboardLayout pageTitle="Suppliers">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Supplier Management</h2>
            <p className="text-muted-foreground">Manage your vendors and procurement contacts.</p>
          </div>
          <Button onClick={handleOpenCreate} className="gap-2 w-full lg:w-auto">
            <Plus className="w-4 h-4" /> Add Supplier
          </Button>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search suppliers by company, contact, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background"
            />
          </div>
          <div className="flex gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[160px] bg-background">
                <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
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
                    <TableHead>Company</TableHead>
                    <TableHead>Contact Person</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Lead Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSuppliers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No suppliers found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSuppliers.map((supplier) => (
                      <TableRow key={supplier.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium text-foreground">
                          <div className="flex items-center gap-2">
                            <Truck className="w-4 h-4 text-muted-foreground" />
                            {supplier.companyName}
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{supplier.contactPerson}</TableCell>
                        <TableCell className="text-muted-foreground">{supplier.phone}</TableCell>
                        <TableCell className="text-muted-foreground">{supplier.email}</TableCell>
                        <TableCell className="text-muted-foreground">{supplier.leadTimeDays} days</TableCell>
                        <TableCell>
                          {supplier.isActive ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                          ) : (
                            <Badge variant="secondary">Inactive</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <ActionMenu
                            onView={() => handleOpenDetails(supplier)}
                            onEdit={() => handleOpenEdit(supplier)}
                            onDelete={() => handleOpenDelete(supplier)}
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
          {filteredSuppliers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground bg-card rounded-xl border border-border">
              No suppliers found.
            </div>
          ) : (
            filteredSuppliers.map(supplier => (
              <Card key={supplier.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-muted-foreground" />
                      <h4 className="font-semibold text-foreground">{supplier.companyName}</h4>
                    </div>
                    <ActionMenu
                      onView={() => handleOpenDetails(supplier)}
                      onEdit={() => handleOpenEdit(supplier)}
                      onDelete={() => handleOpenDelete(supplier)}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {supplier.isActive ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                    ) : (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                    <Badge variant="outline">{supplier.leadTimeDays} days lead</Badge>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>{supplier.contactPerson}</p>
                    <p>{supplier.phone}</p>
                    <p>{supplier.email}</p>
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
              <SheetTitle>{selectedSupplier ? 'Edit Supplier' : 'Add New Supplier'}</SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-hidden p-6">
              <SupplierForm 
                initialData={selectedSupplier} 
                onSubmit={handleFormSubmit} 
                onCancel={() => setIsFormOpen(false)} 
              />
            </div>
          </SheetContent>
        </Sheet>

        <SupplierDetailsModal 
          isOpen={isDetailsOpen} 
          onClose={() => setIsDetailsOpen(false)} 
          supplier={selectedSupplier} 
          onEdit={handleOpenEdit}
        />

        <DeleteConfirmationModal 
          isOpen={isDeleteOpen} 
          onClose={() => setIsDeleteOpen(false)} 
          onConfirm={handleDeleteConfirm} 
          product={selectedSupplier ? { id: selectedSupplier.id, title: selectedSupplier.companyName, sku: selectedSupplier.id } : null} 
        />

      </DashboardLayout>
    </>
  );
};

export default SuppliersPage;


import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Search, Plus, Filter, ArrowUpDown } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { toast } from 'sonner';

import { useProducts } from '@/hooks/useProducts.js';
import ProductTable from '@/components/ProductTable.jsx';
import ProductCard from '@/components/ProductCard.jsx';
import ProductForm from '@/components/ProductForm.jsx';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal.jsx';
import ProductDetailsModal from '@/components/ProductDetailsModal.jsx';

const ProductsPage = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('title-asc');

  // Modals State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Derived Data
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.sku.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    // Filters
    if (categoryFilter !== 'all') {
      result = result.filter(p => p.category === categoryFilter);
    }
    if (statusFilter !== 'all') {
      if (statusFilter === 'low_stock') {
        result = result.filter(p => p.quantity <= p.minStockLevel && !p.isSpecialOrder);
      } else {
        result = result.filter(p => p.status === statusFilter);
      }
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'title-asc': return a.title.localeCompare(b.title);
        case 'title-desc': return b.title.localeCompare(a.title);
        case 'price-asc': return a.sellingPrice - b.sellingPrice;
        case 'price-desc': return b.sellingPrice - a.sellingPrice;
        case 'qty-asc': return a.quantity - b.quantity;
        case 'qty-desc': return b.quantity - a.quantity;
        default: return 0;
      }
    });

    return result;
  }, [products, searchQuery, categoryFilter, statusFilter, sortBy]);

  // Handlers
  const handleOpenCreate = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (product) => {
    setSelectedProduct(product);
    setIsDetailsOpen(false);
    setIsFormOpen(true);
  };

  const handleOpenDelete = (product) => {
    setSelectedProduct(product);
    setIsDeleteOpen(true);
  };

  const handleOpenDetails = (product) => {
    setSelectedProduct(product);
    setIsDetailsOpen(true);
  };

  const handleFormSubmit = (productData) => {
    if (selectedProduct) {
      updateProduct(selectedProduct.id, productData);
      toast.success('Product updated successfully');
    } else {
      addProduct(productData);
      toast.success('Product created successfully');
    }
    setIsFormOpen(false);
  };

  const handleDeleteConfirm = (id) => {
    deleteProduct(id);
    toast.success('Product deleted successfully');
    setIsDeleteOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Products - American V8 Muscle Parts Admin</title>
        <meta name="description" content="Manage your V8 muscle car parts inventory" />
      </Helmet>

      <DashboardLayout pageTitle="Products">
        
        {/* Header & Actions */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Inventory Management</h2>
            <p className="text-muted-foreground">Manage your parts, pricing, and stock levels.</p>
          </div>
          <Button onClick={handleOpenCreate} className="gap-2 w-full lg:w-auto">
            <Plus className="w-4 h-4" /> Add Product
          </Button>
        </div>

        {/* Filters Bar */}
        <div className="bg-card border border-border rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search SKU, title, brand..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[160px] bg-background">
                <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Carburetors">Carburetors</SelectItem>
                <SelectItem value="Bearings">Bearings</SelectItem>
                <SelectItem value="Camshafts">Camshafts</SelectItem>
                <SelectItem value="Gaskets">Gaskets</SelectItem>
                <SelectItem value="Fuel system">Fuel System</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[160px] bg-background">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="low_stock">Low Stock</SelectItem>
                <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                <SelectItem value="special_order_only">Special Order</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[180px] bg-background">
                <ArrowUpDown className="w-4 h-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title-asc">Title (A-Z)</SelectItem>
                <SelectItem value="title-desc">Title (Z-A)</SelectItem>
                <SelectItem value="price-desc">Price (High-Low)</SelectItem>
                <SelectItem value="price-asc">Price (Low-High)</SelectItem>
                <SelectItem value="qty-asc">Stock (Low-High)</SelectItem>
                <SelectItem value="qty-desc">Stock (High-Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block">
          <ProductTable 
            products={filteredAndSortedProducts} 
            onEdit={handleOpenEdit}
            onDelete={handleOpenDelete}
            onView={handleOpenDetails}
          />
        </div>

        {/* Mobile Cards View */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          {filteredAndSortedProducts.length === 0 ? (
            <div className="col-span-full text-center py-8 text-muted-foreground bg-card rounded-xl border border-border">
              No products found.
            </div>
          ) : (
            filteredAndSortedProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product}
                onEdit={handleOpenEdit}
                onDelete={handleOpenDelete}
                onView={handleOpenDetails}
              />
            ))
          )}
        </div>

        {/* Form Slide-over */}
        <Sheet open={isFormOpen} onOpenChange={setIsFormOpen}>
          <SheetContent side="right" className="w-full sm:max-w-2xl p-0 flex flex-col">
            <SheetHeader className="px-6 py-4 border-b border-border">
              <SheetTitle>{selectedProduct ? 'Edit Product' : 'Add New Product'}</SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-hidden p-6">
              <ProductForm 
                product={selectedProduct} 
                onSubmit={handleFormSubmit} 
                onCancel={() => setIsFormOpen(false)} 
              />
            </div>
          </SheetContent>
        </Sheet>

        {/* Modals */}
        <DeleteConfirmationModal 
          isOpen={isDeleteOpen} 
          onClose={() => setIsDeleteOpen(false)} 
          onConfirm={handleDeleteConfirm} 
          product={selectedProduct} 
        />

        <ProductDetailsModal 
          isOpen={isDetailsOpen} 
          onClose={() => setIsDetailsOpen(false)} 
          product={selectedProduct} 
          onEdit={handleOpenEdit}
        />

      </DashboardLayout>
    </>
  );
};

export default ProductsPage;

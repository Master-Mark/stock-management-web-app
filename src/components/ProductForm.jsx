import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/FormInput.jsx';
import FormSelect from '@/components/FormSelect.jsx';
import FormTextarea from '@/components/FormTextarea.jsx';
import FormCheckbox from '@/components/FormCheckbox.jsx';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSuppliers } from '@/hooks/useSuppliers';
import { label } from 'framer-motion/client';

const CATEGORIES = [
  { value: 'Carburetors', label: 'Carburetors' },
  { value: 'Bearings', label: 'Bearings' },
  { value: 'Camshafts', label: 'Camshafts' },
  { value: 'Rings', label: 'Rings' },
  { value: 'Gaskets', label: 'Gaskets' },
  { value: 'Fuel system', label: 'Fuel system' },
  { value: 'Ignition', label: 'Ignition' },
];

const BRANDS = [
  { value: 'Holley', label: 'Holley' },
  { value: 'Edelbrock', label: 'Edelbrock' },
  { value: 'ARP', label: 'ARP' },
  { value: 'COMP Cams', label: 'COMP Cams' },
  { value: 'ACDelco', label: 'ACDelco' },
  { value: 'Moroso', label: 'Moroso' },
  { value: 'Lokar', label: 'Lokar' },
  { value: 'Speedway Motors', label: 'Speedway Motors' },
];

const ENGINE_TYPES = [
  { value: 'Small Block Chevy', label: 'Small Block Chevy' },
  { value: 'Big Block Chevy', label: 'Big Block Chevy' },
  { value: 'Ford 302', label: 'Ford 302' },
  { value: 'Ford 351W', label: 'Ford 351W' },
  { value: 'Mopar 318', label: 'Mopar 318' },
  { value: 'Universal', label: 'Universal' },
];

const STATUSES = [
  { value: 'active', label: 'Active' },
  { value: 'out_of_stock', label: 'Out of Stock' },
  { value: 'discontinued', label: 'Discontinued' },
  { value: 'special_order_only', label: 'Special Order Only' },
];

const defaultFormState = {
  sku: '',
  title: '',
  shortDescription: '',
  description: '',
  category: '',
  brand: '',
  engineType: '',
  supplier: '',
  supplierPartNumber: '',
  supplierCost: 0,
  markupType: 'percentage',
  markupValue: 30,
  sellingPrice: 0,
  quantity: 0,
  minStockLevel: 5,
  isSpecialOrder: false,
  status: 'active',
  notes: '',
};

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(defaultFormState);
  const [errors, setErrors] = useState({});
  const [isPriceManuallyEdited, setIsPriceManuallyEdited] = useState(false);
  const { suppliers } = useSuppliers();

  useEffect(() => {
    if (product) {
      setFormData(product);
      setIsPriceManuallyEdited(true);
    }
  }, [product]);

  // Auto-calculate selling price
  useEffect(() => {
    if (isPriceManuallyEdited) return;

    const cost = parseFloat(formData.supplierCost) || 0;
    const markup = parseFloat(formData.markupValue) || 0;
    let price = 0;

    if (formData.markupType === 'percentage') {
      price = cost + cost * (markup / 100);
    } else {
      price = cost + markup;
    }

    setFormData((prev) => ({ ...prev, sellingPrice: price.toFixed(2) }));
  }, [
    formData.supplierCost,
    formData.markupType,
    formData.markupValue,
    isPriceManuallyEdited,
  ]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handlePriceChange = (e) => {
    setIsPriceManuallyEdited(true);
    handleChange('sellingPrice', e.target.value);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.sku) newErrors.sku = 'SKU is required';
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.brand) newErrors.brand = 'Brand is required';
    if (formData.supplierCost < 0)
      newErrors.supplierCost = 'Cost cannot be negative';
    if (formData.sellingPrice < 0)
      newErrors.sellingPrice = 'Price cannot be negative';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        supplierCost: parseFloat(formData.supplierCost),
        markupValue: parseFloat(formData.markupValue),
        sellingPrice: parseFloat(formData.sellingPrice),
        quantity: parseInt(formData.quantity, 10),
        minStockLevel: parseInt(formData.minStockLevel, 10),
      });
    }
  };

  const supplierOptions = suppliers.map((sup) => ({
    label: sup.companyName,
    value: sup.id.toString(),
  }));

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <ScrollArea className="flex-1 pr-4 -mr-4">
        <div className="space-y-6 pb-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                id="sku"
                label="SKU"
                value={formData.sku}
                onChange={(e) => handleChange('sku', e.target.value)}
                error={errors.sku}
                placeholder="e.g. HOL-1234"
              />
              <FormInput
                id="title"
                label="Product Title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                error={errors.title}
                placeholder="e.g. Holley 750 CFM Carburetor"
              />
            </div>
            <FormTextarea
              id="description"
              label="Description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              maxLength={500}
            />
          </div>

          {/* Classification */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">
              Classification
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormSelect
                id="category"
                label="Category"
                value={formData.category}
                onValueChange={(v) => handleChange('category', v)}
                options={CATEGORIES}
                error={errors.category}
              />
              <FormSelect
                id="brand"
                label="Brand"
                value={formData.brand}
                onValueChange={(v) => handleChange('brand', v)}
                options={BRANDS}
                error={errors.brand}
              />
              <FormSelect
                id="engineType"
                label="Engine Type"
                value={formData.engineType}
                onValueChange={(v) => handleChange('engineType', v)}
                options={ENGINE_TYPES}
              />
              <FormSelect
                id="status"
                label="Status"
                value={formData.status}
                onValueChange={(v) => handleChange('status', v)}
                options={STATUSES}
              />
            </div>
          </div>

          {/* Pricing & Supplier */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">
              Pricing & Supplier
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormSelect
                id="supplierId"
                label="Supplier"
                value={formData.supplierId}
                onValueChange={(v) => handleChange('supplierId', v)}
                options={supplierOptions}
              />
              <FormInput
                id="supplierPartNumber"
                label="Supplier Part Number"
                value={formData.supplierPartNumber}
                onChange={(e) =>
                  handleChange('supplierPartNumber', e.target.value)
                }
              />
              <FormInput
                id="supplierCost"
                label="Supplier Cost ($)"
                type="number"
                step="0.01"
                min="0"
                value={formData.supplierCost}
                onChange={(e) => {
                  setIsPriceManuallyEdited(false);
                  handleChange('supplierCost', e.target.value);
                }}
                error={errors.supplierCost}
              />
              <div className="grid grid-cols-2 gap-2">
                <FormSelect
                  id="markupType"
                  label="Markup Type"
                  value={formData.markupType}
                  onValueChange={(v) => {
                    setIsPriceManuallyEdited(false);
                    handleChange('markupType', v);
                  }}
                  options={[
                    { value: 'percentage', label: '%' },
                    { value: 'fixed', label: '$' },
                  ]}
                />
                <FormInput
                  id="markupValue"
                  label="Markup Value"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.markupValue}
                  onChange={(e) => {
                    setIsPriceManuallyEdited(false);
                    handleChange('markupValue', e.target.value);
                  }}
                />
              </div>
              <FormInput
                id="sellingPrice"
                label="Selling Price ($)"
                type="number"
                step="0.01"
                min="0"
                value={formData.sellingPrice}
                onChange={handlePriceChange}
                error={errors.sellingPrice}
                className="md:col-span-2"
              />
            </div>
          </div>

          {/* Inventory */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Inventory</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                id="quantity"
                label="Quantity in Stock"
                type="number"
                min="0"
                value={formData.quantity}
                onChange={(e) => handleChange('quantity', e.target.value)}
              />
              <FormInput
                id="minStockLevel"
                label="Minimum Stock Level"
                type="number"
                min="0"
                value={formData.minStockLevel}
                onChange={(e) => handleChange('minStockLevel', e.target.value)}
              />
            </div>
            <FormCheckbox
              id="isSpecialOrder"
              label="Special Order Item"
              description="This item is not kept in stock and is ordered upon customer request."
              checked={formData.isSpecialOrder}
              onCheckedChange={(c) => handleChange('isSpecialOrder', c)}
            />
            <FormTextarea
              id="notes"
              label="Internal Notes"
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
            />
          </div>
        </div>
      </ScrollArea>

      <div className="pt-4 border-t mt-auto flex justify-end gap-3 bg-background">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {product ? 'Update Product' : 'Create Product'}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;

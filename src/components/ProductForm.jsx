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
  // Engine core
  { value: 'engine_blocks', label: 'Engine Blocks' },
  { value: 'crankshafts', label: 'Crankshafts' },
  { value: 'camshafts', label: 'Camshafts' },
  { value: 'pistons_rings', label: 'Pistons & Rings' },
  { value: 'bearings', label: 'Bearings' },
  { value: 'valvetrain', label: 'Valvetrain' },

  // Air & fuel
  { value: 'carburetors', label: 'Carburetors' },
  { value: 'fuel_system', label: 'Fuel System' },
  { value: 'intake_manifolds', label: 'Intake Manifolds' },
  { value: 'air_intake', label: 'Air Intake' },

  // Ignition & electrical
  { value: 'ignition', label: 'Ignition' },
  { value: 'spark_plugs', label: 'Spark Plugs' },
  { value: 'electrical', label: 'Electrical' },

  // Exhaust & performance
  { value: 'exhaust', label: 'Exhaust Systems' },
  { value: 'headers', label: 'Headers' },

  // Cooling & lubrication
  { value: 'cooling_system', label: 'Cooling System' },
  { value: 'radiators', label: 'Radiators' },
  { value: 'oil_system', label: 'Oil System' },

  // Gaskets & rebuild kits
  { value: 'gaskets', label: 'Gaskets' },
  { value: 'engine_kits', label: 'Engine Rebuild Kits' },

  // Accessories & misc
  { value: 'belts_pulleys', label: 'Belts & Pulleys' },
  { value: 'filters', label: 'Filters' },
  { value: 'engine_accessories', label: 'Engine Accessories' },
];

const BRANDS = [
  { value: 'holley', label: 'Holley' },
  { value: 'edelbrock', label: 'Edelbrock' },
  { value: 'arp', label: 'ARP' },
  { value: 'comp_cams', label: 'COMP Cams' },
  { value: 'acdelco', label: 'ACDelco' },
  { value: 'moroso', label: 'Moroso' },
  { value: 'lokar', label: 'Lokar' },
  { value: 'speedway_motors', label: 'Speedway Motors' },

  // 🔥 Must-have V8 / muscle brands
  { value: 'msd', label: 'MSD' },
  { value: 'brodix', label: 'Brodix' },
  { value: 'trick_flow', label: 'Trick Flow' },
  { value: 'afr', label: 'AFR (Air Flow Research)' },
  { value: 'weiand', label: 'Weiand' },
  { value: 'mallory', label: 'Mallory' },

  // Engine internals
  { value: 'scat', label: 'Scat' },
  { value: 'eagle', label: 'Eagle' },
  { value: 'probe', label: 'Probe Industries' },
  { value: 'mahle', label: 'Mahle' },

  // Gaskets / sealing
  { value: 'fel_pro', label: 'Fel-Pro' },
  { value: 'cometic', label: 'Cometic' },

  // Oil & cooling
  { value: 'melling', label: 'Melling' },
  { value: 'griffin', label: 'Griffin Radiators' },

  // Performance / racing
  { value: 'jesel', label: 'Jesel' },
  { value: 'crower', label: 'Crower' },

  // Other
  { value: 'Other', label: 'Other' },
];

const ENGINE_TYPES = [
  // 🔵 Chevy - Small Block
  { value: 'sbc_265', label: 'Small Block Chevy 265' },
  { value: 'sbc_283', label: 'Small Block Chevy 283' },
  { value: 'sbc_305', label: 'Small Block Chevy 305' },
  { value: 'sbc_327', label: 'Small Block Chevy 327' },
  { value: 'sbc_350', label: 'Small Block Chevy 350' },
  { value: 'sbc_383', label: 'Small Block Chevy 383 Stroker' },
  { value: 'small_block_chevy', label: 'Small Block Chevy (All)' },

  // 🔵 Chevy - Big Block
  { value: 'bbc_396', label: 'Big Block Chevy 396' },
  { value: 'bbc_402', label: 'Big Block Chevy 402' },
  { value: 'bbc_427', label: 'Big Block Chevy 427' },
  { value: 'bbc_454', label: 'Big Block Chevy 454' },
  { value: 'big_block_chevy', label: 'Big Block Chevy (All)' },

  // 🔵 Chevy LS (VERY important)
  { value: 'ls1', label: 'LS1' },
  { value: 'ls2', label: 'LS2' },
  { value: 'ls3', label: 'LS3' },
  { value: 'ls6', label: 'LS6' },
  { value: 'ls7', label: 'LS7' },
  { value: 'ls9', label: 'LS9' },
  { value: 'ls_engines', label: 'LS Engines (All)' },

  // 🔴 Ford Windsor
  { value: 'ford_260', label: 'Ford 260' },
  { value: 'ford_289', label: 'Ford 289' },
  { value: 'ford_302', label: 'Ford 302' },
  { value: 'ford_351w', label: 'Ford 351 Windsor' },
  { value: 'ford_351c', label: 'Ford 351 Cleveland' },
  { value: 'ford_windsor_family', label: 'Ford Windsor (All)' },

  // 🔴 Ford Big Block
  { value: 'ford_390', label: 'Ford 390 FE' },
  { value: 'ford_427', label: 'Ford 427 FE' },
  { value: 'ford_428', label: 'Ford 428 Cobra Jet' },
  { value: 'ford_big_block', label: 'Ford Big Block (All)' },

  // 🟡 Mopar Small Block
  { value: 'mopar_273', label: 'Mopar 273' },
  { value: 'mopar_318', label: 'Mopar 318' },
  { value: 'mopar_340', label: 'Mopar 340' },
  { value: 'mopar_360', label: 'Mopar 360' },
  { value: 'mopar_small_block', label: 'Mopar Small Block (All)' },

  // 🟡 Mopar Big Block
  { value: 'mopar_383', label: 'Mopar 383' },
  { value: 'mopar_400', label: 'Mopar 400' },
  { value: 'mopar_426_hemi', label: 'Mopar 426 HEMI' },
  { value: 'mopar_440', label: 'Mopar 440' },
  { value: 'mopar_big_block', label: 'Mopar Big Block (All)' },

  // ⚙️ Generic / cross-compatible
  { value: 'universal', label: 'Universal / Fits Multiple Engines' },
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
      // price = cost + cost * (markup / 100);
      const divisor = 1 - markup / 100;
      price = divisor > 0 ? cost / divisor : 0;
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
    value: sup.companyName.toString(),
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
                value={formData.sku || ''}
                onChange={(e) => handleChange('sku', e.target.value)}
                error={errors.sku}
                placeholder="e.g. HOL-1234"
              />
              <FormInput
                id="title"
                label="Product Title"
                value={formData.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                error={errors.title}
                placeholder="e.g. Holley 750 CFM Carburetor"
              />
            </div>
            <FormTextarea
              id="description"
              label="Description"
              value={formData.description || ''}
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
                value={formData.category || ''}
                onValueChange={(v) => handleChange('category', v)}
                options={CATEGORIES}
                error={errors.category}
              />
              <FormSelect
                id="brand"
                label="Brand"
                value={formData.brand || ''}
                onValueChange={(v) => handleChange('brand', v)}
                options={BRANDS}
                error={errors.brand}
              />
              <FormSelect
                id="engineType"
                label="Engine Type"
                value={formData.engineType || ''}
                onValueChange={(v) => handleChange('engineType', v)}
                options={ENGINE_TYPES}
              />
              <FormSelect
                id="status"
                label="Status"
                value={formData.status || ''}
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
                id="supplier"
                label="Supplier"
                value={formData.supplier || ''}
                onValueChange={(v) => handleChange('supplier', v)}
                options={supplierOptions}
              />
              <FormInput
                id="supplierPartNumber"
                label="Supplier Part Number"
                value={formData.supplierPartNumber || ''}
                onChange={(e) =>
                  handleChange('supplierPartNumber', e.target.value)
                }
              />
              <FormInput
                id="supplierCost"
                label="Supplier Cost (R)"
                type="number"
                step="0.01"
                min="0"
                value={formData.supplierCost || ''}
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
                  value={formData.markupType || ''}
                  onValueChange={(v) => {
                    setIsPriceManuallyEdited(false);
                    handleChange('markupType', v);
                  }}
                  options={[
                    { value: 'percentage', label: '%' },
                    { value: 'fixed', label: 'R' },
                  ]}
                />
                <FormInput
                  id="markupValue"
                  label="Markup Value"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.markupValue || 30}
                  onChange={(e) => {
                    setIsPriceManuallyEdited(false);
                    handleChange('markupValue', e.target.value);
                  }}
                />
              </div>
              <FormInput
                id="sellingPrice"
                label="Selling Price (R)"
                type="number"
                step="0.01"
                min="0"
                value={formData.sellingPrice || ''}
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
                value={formData.quantity || ''}
                onChange={(e) => handleChange('quantity', e.target.value)}
              />
              <FormInput
                id="minStockLevel"
                label="Minimum Stock Level"
                type="number"
                min="0"
                value={formData.minStockLevel || ''}
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
              value={formData.notes || ''}
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

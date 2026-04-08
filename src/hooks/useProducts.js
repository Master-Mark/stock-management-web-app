
import { useState, useMemo } from 'react';

// Realistic dummy data for American V8 Muscle Parts
const initialProducts = [
  {
    id: 'PRD-001',
    sku: 'HOL-0-4779C',
    title: 'Holley 750 CFM Double Pumper Carburetor',
    shortDescription: 'Classic 4150 series mechanical secondary carburetor.',
    fullDescription: 'The Holley 4150 Double Pumper is a perfect upgrade for hot street cars and race vehicles. Features dual metering blocks, mechanical secondaries, and a manual choke.',
    category: 'Carburetors',
    brand: 'Holley',
    engineType: 'Universal',
    supplier: 'Holley Performance',
    supplierPartNumber: '0-4779C',
    supplierCost: 450.00,
    markupType: 'percentage',
    markupValue: 35,
    sellingPrice: 607.50,
    quantity: 12,
    minStockLevel: 5,
    isSpecialOrder: false,
    status: 'active',
    notes: 'High demand item, keep stock levels monitored.'
  },
  {
    id: 'PRD-002',
    sku: 'EDL-7101',
    title: 'Edelbrock Performer RPM Intake Manifold',
    shortDescription: 'Dual-plane intake for Small Block Chevy.',
    fullDescription: 'Designed for 1500 to 6500 RPM street-driven power. Fits 1955-1986 Small Block Chevy engines.',
    category: 'Fuel system',
    brand: 'Edelbrock',
    engineType: 'Small Block Chevy',
    supplier: 'Summit Racing',
    supplierPartNumber: 'EDL-7101',
    supplierCost: 185.00,
    markupType: 'percentage',
    markupValue: 40,
    sellingPrice: 259.00,
    quantity: 3,
    minStockLevel: 8,
    isSpecialOrder: false,
    status: 'active',
    notes: 'Low stock alert triggered.'
  },
  {
    id: 'PRD-003',
    sku: 'CCA-12-212-2',
    title: 'COMP Cams Magnum 280H Camshaft',
    shortDescription: 'Hydraulic flat tappet cam for SBC.',
    fullDescription: 'Great for street machines. Noticeable idle, good mid-range power. Operating range 2000-6000 RPM.',
    category: 'Camshafts',
    brand: 'COMP Cams',
    engineType: 'Small Block Chevy',
    supplier: 'Jegs',
    supplierPartNumber: '12-212-2',
    supplierCost: 145.00,
    markupType: 'percentage',
    markupValue: 45,
    sellingPrice: 210.25,
    quantity: 0,
    minStockLevel: 4,
    isSpecialOrder: false,
    status: 'out_of_stock',
    notes: 'Awaiting shipment from Jegs.'
  },
  {
    id: 'PRD-004',
    sku: 'ARP-134-3601',
    title: 'ARP High Performance Head Bolt Kit',
    shortDescription: 'Hex style head bolts for SBC.',
    fullDescription: 'Premium grade 8740 alloy chromoly steel. Rated at 180,000 psi tensile strength.',
    category: 'Gaskets', // Grouping fasteners near gaskets for simplicity
    brand: 'ARP',
    engineType: 'Small Block Chevy',
    supplier: 'Summit Racing',
    supplierPartNumber: '134-3601',
    supplierCost: 65.00,
    markupType: 'fixed',
    markupValue: 30,
    sellingPrice: 95.00,
    quantity: 24,
    minStockLevel: 10,
    isSpecialOrder: false,
    status: 'active',
    notes: ''
  },
  {
    id: 'PRD-005',
    sku: 'MOR-20140',
    title: 'Moroso Street/Strip Oil Pan',
    shortDescription: '7-quart capacity oil pan for BBC.',
    fullDescription: 'Deep sump design for Big Block Chevy Mark IV engines. Includes trap door baffle for oil control.',
    category: 'Bearings', // Using available categories
    brand: 'Moroso',
    engineType: 'Big Block Chevy',
    supplier: 'RockAuto',
    supplierPartNumber: '20140',
    supplierCost: 210.00,
    markupType: 'percentage',
    markupValue: 30,
    sellingPrice: 273.00,
    quantity: 2,
    minStockLevel: 2,
    isSpecialOrder: true,
    status: 'special_order_only',
    notes: 'Usually drop-shipped directly from manufacturer.'
  }
];

export const useProducts = () => {
  const [products, setProducts] = useState(initialProducts);

  // TODO: Replace with API call to /api/products (GET)
  
  const addProduct = (productData) => {
    // TODO: Replace with API call to /api/products (POST)
    const newProduct = {
      ...productData,
      id: `PRD-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`
    };
    setProducts(prev => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id, productData) => {
    // TODO: Replace with API call to /api/products/:id (PUT/PATCH)
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...productData } : p));
  };

  const deleteProduct = (id) => {
    // TODO: Replace with API call to /api/products/:id (DELETE)
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const getProductById = (id) => {
    return products.find(p => p.id === id);
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById
  };
};

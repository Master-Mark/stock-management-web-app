
import { useState } from 'react';

const initialOrders = [
  {
    id: 'ORD-2024-001',
    clientName: 'Kai Nakamura',
    clientPhone: '+1 (555) 234-5678',
    clientEmail: 'kai.nakamura@email.com',
    supplier: 'Holley Performance',
    status: 'in_transit',
    paymentStatus: 'paid',
    orderType: 'standard',
    sourceChannel: 'website',
    orderDate: '2024-03-15',
    etaDate: '2024-03-22',
    totalAmount: 607.50,
    depositAmount: 607.50,
    balanceDue: 0,
    items: [
      { id: 'ITM-1', title: 'Holley 750 CFM Double Pumper Carburetor', sku: 'HOL-0-4779C', quantity: 1, unitPrice: 607.50, lineTotal: 607.50 }
    ],
    payments: [
      { id: 'PAY-1', date: '2024-03-15', method: 'credit_card', amount: 607.50 }
    ],
    timeline: [
      { id: 'TL-1', type: 'order_placed', message: 'Order placed via website', timestamp: '2024-03-15T10:30:00Z', creator: 'System' }
    ],
    internalNotes: 'First time buyer.',
    clientNotes: 'Please ensure it is the mechanical secondary version.'
  },
  {
    id: 'ORD-2024-002',
    clientName: 'Elena Vasquez',
    clientPhone: '+1 (555) 345-6789',
    clientEmail: 'elena@vasquezauto.com',
    supplier: 'Summit Racing',
    status: 'pending',
    paymentStatus: 'unpaid',
    orderType: 'special_order',
    sourceChannel: 'phone',
    orderDate: '2024-03-18',
    etaDate: '2024-03-25',
    totalAmount: 1250.00,
    depositAmount: 0,
    balanceDue: 1250.00,
    items: [
      { id: 'ITM-2', title: 'Edelbrock Performer RPM Intake Manifold', sku: 'EDL-7101', quantity: 2, unitPrice: 259.00, lineTotal: 518.00 },
      { id: 'ITM-3', title: 'COMP Cams Magnum 280H Camshaft', sku: 'CCA-12-212-2', quantity: 1, unitPrice: 210.25, lineTotal: 210.25 }
    ],
    payments: [],
    timeline: [
      { id: 'TL-2', type: 'quote_sent', message: 'Quote sent to client', timestamp: '2024-03-18T14:20:00Z', creator: 'Admin' }
    ],
    internalNotes: 'Awaiting approval on quote.',
    clientNotes: ''
  },
  // Add more dummy orders to reach 15-20 as requested, keeping it brief for effort level
  ...Array.from({ length: 13 }).map((_, i) => ({
    id: `ORD-2024-${(i + 3).toString().padStart(3, '0')}`,
    clientName: ['Marcus Chen', 'Sarah Mitchell', 'James Wilson', 'Priya Sharma', 'David Thompson'][i % 5],
    clientPhone: '+1 (555) 000-0000',
    clientEmail: `client${i}@example.com`,
    supplier: ['Jegs', 'RockAuto', 'Speedway Motors', 'Edelbrock'][i % 4],
    status: ['ordered', 'arrived', 'ready_for_collection', 'completed', 'cancelled'][i % 5],
    paymentStatus: ['partial', 'paid', 'unpaid'][i % 3],
    orderType: ['rush', 'custom', 'standard'][i % 3],
    sourceChannel: ['walk_in', 'email', 'phone'][i % 3],
    orderDate: `2024-03-${(i + 1).toString().padStart(2, '0')}`,
    etaDate: `2024-03-${(i + 10).toString().padStart(2, '0')}`,
    totalAmount: 150.00 + (i * 50),
    depositAmount: 50.00,
    balanceDue: 100.00 + (i * 50),
    items: [],
    payments: [],
    timeline: [],
    internalNotes: '',
    clientNotes: ''
  }))
];

export const useOrders = () => {
  const [orders, setOrders] = useState(initialOrders);

  // TODO: Replace with API call to /api/orders (GET)
  const getOrderById = (id) => orders.find(o => o.id === id);

  const addOrder = (orderData) => {
    // TODO: Replace with API call to /api/orders (POST)
    const newOrder = {
      ...orderData,
      id: `ORD-2024-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrder = (id, orderData) => {
    // TODO: Replace with API call to /api/orders/:id (PUT/PATCH)
    setOrders(prev => prev.map(o => o.id === id ? { ...o, ...orderData } : o));
  };

  const deleteOrder = (id) => {
    // TODO: Replace with API call to /api/orders/:id (DELETE)
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  const searchOrders = (query) => {
    if (!query) return orders;
    const q = query.toLowerCase();
    return orders.filter(o => 
      o.id.toLowerCase().includes(q) ||
      o.clientName.toLowerCase().includes(q) ||
      o.supplier.toLowerCase().includes(q)
    );
  };

  const filterOrders = (filters, list = orders) => {
    return list.filter(o => {
      if (filters.status && filters.status !== 'all' && o.status !== filters.status) return false;
      if (filters.paymentStatus && filters.paymentStatus !== 'all' && o.paymentStatus !== filters.paymentStatus) return false;
      return true;
    });
  };

  return {
    orders,
    getOrderById,
    addOrder,
    updateOrder,
    deleteOrder,
    searchOrders,
    filterOrders
  };
};

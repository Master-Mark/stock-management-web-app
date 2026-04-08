
import { useState } from 'react';

const initialClients = [
  {
    id: 'CLT-001',
    type: 'Individual',
    firstName: 'Kai',
    lastName: 'Nakamura',
    businessName: '',
    contactPerson: '',
    phone: '+1 (555) 234-5678',
    alternatePhone: '',
    email: 'kai.nakamura@email.com',
    addressLine1: '123 Cherry Lane',
    addressLine2: '',
    suburb: 'Downtown',
    city: 'Seattle',
    province: 'WA',
    postalCode: '98101',
    notes: 'Prefers email communication.',
    totalOrders: 23,
    totalSpent: 8742.00
  },
  {
    id: 'CLT-002',
    type: 'Business',
    firstName: '',
    lastName: '',
    businessName: 'Vasquez Auto Repair',
    contactPerson: 'Elena Vasquez',
    phone: '+1 (555) 345-6789',
    alternatePhone: '+1 (555) 345-6790',
    email: 'elena@vasquezauto.com',
    addressLine1: '456 Mechanic Blvd',
    addressLine2: 'Suite B',
    suburb: 'Industrial Park',
    city: 'Austin',
    province: 'WA',
    postalCode: '78701',
    notes: 'Net 30 terms approved.',
    totalOrders: 17,
    totalSpent: 5234.00
  }
];

export const useClients = () => {
  const [clients, setClients] = useState(initialClients);

  // TODO: Replace with API call to /api/clients (GET)
  const getClients = () => clients;

  const addClient = (clientData) => {
    // TODO: Replace with API call to /api/clients (POST)
    const newClient = {
      ...clientData,
      id: `CLT-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      totalOrders: 0,
      totalSpent: 0
    };
    setClients(prev => [newClient, ...prev]);
    return newClient;
  };

  const updateClient = (id, clientData) => {
    // TODO: Replace with API call to /api/clients/:id (PUT/PATCH)
    setClients(prev => prev.map(c => c.id === id ? { ...c, ...clientData } : c));
  };

  const deleteClient = (id) => {
    // TODO: Replace with API call to /api/clients/:id (DELETE)
    setClients(prev => prev.filter(c => c.id !== id));
  };

  const searchClients = (query) => {
    if (!query) return clients;
    const q = query.toLowerCase();
    return clients.filter(c => 
      (c.firstName && c.firstName.toLowerCase().includes(q)) ||
      (c.lastName && c.lastName.toLowerCase().includes(q)) ||
      (c.businessName && c.businessName.toLowerCase().includes(q)) ||
      (c.email && c.email.toLowerCase().includes(q)) ||
      (c.phone && c.phone.includes(q))
    );
  };

  const filterByType = (type, list = clients) => {
    if (!type || type === 'All') return list;
    return list.filter(c => c.type === type);
  };

  return {
    clients,
    getClients,
    addClient,
    updateClient,
    deleteClient,
    searchClients,
    filterByType
  };
};


import { useState } from 'react';

const initialSuppliers = [
  {
    id: 'SUP-001',
    companyName: 'Holley Performance Products',
    supplierCode: 'HOL',
    contactPerson: 'Sarah Mitchell',
    contactPersonPosition: 'Account Manager',
    phone: '+1 (555) 111-2222',
    alternatePhone: '',
    email: 'orders@holley.com',
    website: 'www.holley.com',
    addressLine1: '1801 Russellville Rd',
    addressLine2: '',
    city: 'Bowling Green',
    province: 'KY',
    postalCode: '42101',
    country: 'USA',
    paymentTerms: 'Net 30',
    leadTimeDays: 5,
    preferredContactMethod: 'Email',
    notes: 'Primary supplier for carburetors and fuel systems.',
    isActive: true
  },
  {
    id: 'SUP-002',
    companyName: 'Edelbrock Corporation',
    supplierCode: 'EDL',
    contactPerson: 'James Chen',
    contactPersonPosition: 'Sales Rep',
    phone: '+1 (555) 222-3333',
    alternatePhone: '',
    email: 'sales@edelbrock.com',
    website: 'www.edelbrock.com',
    addressLine1: '2700 California St',
    addressLine2: '',
    city: 'Torrance',
    province: 'CA',
    postalCode: '90503',
    country: 'USA',
    paymentTerms: 'Net 15',
    leadTimeDays: 7,
    preferredContactMethod: 'Phone',
    notes: 'Intake manifolds and cylinder heads.',
    isActive: true
  }
];

export const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState(initialSuppliers);

  // TODO: Replace with API call to /api/suppliers (GET)
  const getSuppliers = () => suppliers;

  const addSupplier = (supplierData) => {
    // TODO: Replace with API call to /api/suppliers (POST)
    const newSupplier = {
      ...supplierData,
      id: `SUP-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`
    };
    setSuppliers(prev => [newSupplier, ...prev]);
    return newSupplier;
  };

  const updateSupplier = (id, supplierData) => {
    // TODO: Replace with API call to /api/suppliers/:id (PUT/PATCH)
    setSuppliers(prev => prev.map(s => s.id === id ? { ...s, ...supplierData } : s));
  };

  const deleteSupplier = (id) => {
    // TODO: Replace with API call to /api/suppliers/:id (DELETE)
    setSuppliers(prev => prev.filter(s => s.id !== id));
  };

  const searchSuppliers = (query) => {
    if (!query) return suppliers;
    const q = query.toLowerCase();
    return suppliers.filter(s => 
      s.companyName.toLowerCase().includes(q) ||
      s.contactPerson.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.phone.includes(q)
    );
  };

  const filterByStatus = (status, list = suppliers) => {
    if (status === 'All') return list;
    const isActive = status === 'Active';
    return list.filter(s => s.isActive === isActive);
  };

  return {
    suppliers,
    getSuppliers,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    searchSuppliers,
    filterByStatus
  };
};

import { useState, useEffect } from 'react';

const API_URL = 'https://v8muscleparts.co.za/api/bridge.php';

export const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);

  // 1. GET SUPPLIERS (Load from DB)
  const fetchSuppliers = async () => {
    try {
      const response = await fetch(`${API_URL}?action=getSuppliers`);
      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  // 2. ADD SUPPLIER
  const addSupplier = async (supplierData) => {
    try {
      const response = await fetch(`${API_URL}?action=createSupplier`, {
        method: 'POST',
        body: JSON.stringify(supplierData),
      });
      const result = await response.json();
      if (result.id) {
        fetchSuppliers(); // Refresh the list
        return { ...supplierData, id: result.id };
      }
    } catch (error) {
      console.error('Error adding supplier:', error);
    }
  };

  // 3. UPDATE SUPPLIER
  const updateSupplier = async (id, supplierData) => {
    try {
      await fetch(`${API_URL}?action=updateSupplier`, {
        method: 'POST', // We use POST because bridge.php handles POST/GET
        body: JSON.stringify({ ...supplierData, id }),
      });
      fetchSuppliers(); // Refresh list
    } catch (error) {
      console.error('Error updating supplier:', error);
    }
  };

  // 4. DELETE SUPPLIER
  const deleteSupplier = async (id) => {
    try {
      await fetch(`${API_URL}?action=deleteSupplier`, {
        method: 'POST',
        body: JSON.stringify({ id }),
      });
      fetchSuppliers(); // Refresh list
    } catch (error) {
      console.error('Error deleting supplier:', error);
    }
  };

  // Keep your search and filter logic as they are locally
  const searchSuppliers = (query) => {
    if (!query) return suppliers;
    const q = query.toLowerCase();
    return suppliers.filter(
      (s) =>
        s.companyName?.toLowerCase().includes(q) ||
        s.contactPerson?.toLowerCase().includes(q) ||
        s.email?.toLowerCase().includes(q),
    );
  };

  const filterByStatus = (status, list = suppliers) => {
    if (status === 'All') return list;
    const isActive = status === 'Active';
    return list.filter((s) => s.isActive === isActive);
  };

  return {
    suppliers,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    searchSuppliers,
    filterByStatus,
    refreshSuppliers: fetchSuppliers,
  };
};

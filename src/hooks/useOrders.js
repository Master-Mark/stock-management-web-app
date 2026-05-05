import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

const API_URL = 'https://v8muscleparts.co.za/api/bridge.php';

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Start as true so Details page waits

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}?action=getOrders`);
      const data = await response.json();
      if (data.status === 'success') {
        setOrders(data.data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // FIX: Added String conversion to ensure "ORD-001" matches "ORD-001"
  const getOrderById = useCallback(
    (id) => {
      return orders.find((o) => String(o.id) === String(id));
    },
    [orders],
  );

  const addOrder = async (orderData) => {
    try {
      const response = await fetch(`${API_URL}?action=createOrder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      const result = await response.json();
      if (result.status === 'success') {
        await fetchOrders();
        return true;
      }
      throw new Error(result.message);
    } catch (error) {
      toast.error('Error creating order: ' + error.message);
      return false;
    }
  };

  // NEW: Added updateOrder to connect to your update.php
  const updateOrder = async (id, updatedData) => {
    try {
      const response = await fetch(`${API_URL}?action=updateOrder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...updatedData, id }),
      });
      const result = await response.json();
      if (result.status === 'success') {
        await fetchOrders(); // Refresh local data
        return true;
      }
      throw new Error(result.message);
    } catch (error) {
      toast.error('Update failed: ' + error.message);
      return false;
    }
  };

  // NEW: Added deleteOrder to connect to your delete.php
  const deleteOrder = async (id) => {
    try {
      const response = await fetch(`${API_URL}?action=deleteOrder&id=${id}`);
      const result = await response.json();
      if (result.status === 'success') {
        await fetchOrders();
        toast.success('Order deleted');
        return true;
      }
      throw new Error(result.message);
    } catch (error) {
      toast.error('Delete failed: ' + error.message);
      return false;
    }
  };

  const searchOrders = (query) => {
    if (!query) return orders;
    const q = query.toLowerCase();
    return orders.filter(
      (o) =>
        o.id.toLowerCase().includes(q) ||
        (o.clientName && o.clientName.toLowerCase().includes(q)),
    );
  };

  const filterOrders = (filters, list = orders) => {
    return list.filter((o) => {
      if (
        filters.status &&
        filters.status !== 'all' &&
        o.status !== filters.status
      )
        return false;
      return true;
    });
  };

  return {
    orders,
    isLoading,
    getOrderById,
    addOrder,
    updateOrder, // Exported
    deleteOrder, // Exported
    searchOrders,
    filterOrders,
    refreshOrders: fetchOrders,
  };
};

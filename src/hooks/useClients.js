import { useState, useEffect } from 'react';

const API_URL = 'https://v8muscleparts.co.za/api/bridge.php';

export function useClients() {
  const [clients, setClients] = useState([]);

  const fetchClients = async () => {
    try {
      const res = await fetch(`${API_URL}?action=getClients`);
      const data = await res.json();
      if (data.status === 'success') setClients(data.clients);
    } catch (error) {
      console.error('Failed to fetch clients:', error);
    }
  };

  const addClient = async (client) => {
    try {
      const res = await fetch(`${API_URL}?action=createClient`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(client),
      });
      const data = await res.json();
      if (data.status === 'success') fetchClients();
    } catch (error) {
      console.error('Failed to create client:', error);
    }
  };

  const updateClient = async (id, client) => {
    try {
      const res = await fetch(`${API_URL}?action=updateClient`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...client, id }),
      });
      const data = await res.json();
      if (data.status === 'success') fetchClients();
    } catch (error) {
      console.error('Failed to update client:', error);
    }
  };

  const deleteClient = async (id) => {
    try {
      const res = await fetch(`${API_URL}?action=deleteClient`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.status === 'success') fetchClients();
    } catch (error) {
      console.error('Failed to delete client:', error);
    }
  };

  // --- Add searchClients and filterByType ---
  const searchClients = (query) => {
    if (!query) return clients;
    return clients.filter(
      (client) =>
        client.firstName?.toLowerCase().includes(query.toLowerCase()) ||
        client.lastName?.toLowerCase().includes(query.toLowerCase()) ||
        client.businessName?.toLowerCase().includes(query.toLowerCase()) ||
        client.email?.toLowerCase().includes(query.toLowerCase()) ||
        client.phone?.toLowerCase().includes(query.toLowerCase()),
    );
  };

  const filterByType = (type, list = clients) => {
    if (type === 'All') return list;
    return list.filter((client) => client.type === type);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return {
    clients,
    addClient,
    updateClient,
    deleteClient,
    searchClients,
    filterByType,
  };
}

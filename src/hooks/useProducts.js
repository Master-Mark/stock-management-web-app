import { useState, useEffect, useMemo } from 'react';

// Replace with your actual domain URL
const API_URL = 'https://v8muscleparts.co.za/api/bridge.php';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Load Products from Database on Mount
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?action=getProducts`);
      const data = await response.json();
      // Ensure we always set an array
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. Add Product
  const addProduct = async (productData) => {
    try {
      const response = await fetch(`${API_URL}?action=createProduct`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      const result = await response.json();
      if (result.status === 'success') {
        fetchProducts(); // Refresh list to get new product with real DB ID
        return result;
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  // 3. Update Product
  const updateProduct = async (id, productData) => {
    try {
      const response = await fetch(`${API_URL}?action=updateProduct`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...productData, id }),
      });
      const result = await response.json();
      if (result.status === 'success') {
        fetchProducts(); // Refresh list
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  // 4. Delete Product
  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`${API_URL}?action=deleteProduct`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const result = await response.json();
      if (result.status === 'success') {
        fetchProducts(); // Refresh list
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // 5. Helper for finding a single product (used for Details Modals)
  const getProductById = (id) => {
    return products.find((p) => String(p.id) === String(id));
  };

  return {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    refreshProducts: fetchProducts,
  };
};

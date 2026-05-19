import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useClients } from '@/hooks/useClients';
import { useProducts } from '@/hooks/useProducts';
import { useOrders } from '@/hooks/useOrders';
import { Plus, Trash2 } from 'lucide-react';

const OrderForm = ({ isOpen, onClose }) => {
  const { clients } = useClients();
  const { products } = useProducts();
  const { addOrder } = useOrders();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    clientName: '',
    supplier: '',
    items: [''],
  });

  const totalAmount = formData.items.reduce(
    (sum, item) => sum + (item.lineTotal || 0),
    0,
  );

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          productId: '',
          title: '',
          sku: '',
          quantity: 1,
          unitPrice: 0,
          lineTotal: 0,
        },
      ],
    });
  };

  const handleProductSelect = (index, productId) => {
    const product = products.find((p) => String(p.id) === String(productId));
    if (!product) return;

    const newItems = [...formData.items];
    newItems[index] = {
      productId: product.id,
      title: product.title,
      sku: product.sku,
      quantity: 1,
      unitPrice: Number(product.sellingPrice),
      lineTotal: Number(product.sellingPrice),
    };
    setFormData({ ...formData, items: newItems });
  };

  const handleQuantityChange = (index, qty) => {
    const newItems = [...formData.items];
    const quantity = Math.max(1, parseInt(qty) || 1);
    newItems[index] = {
      ...newItems[index],
      quantity: quantity,
      lineTotal: quantity * newItems[index].unitPrice,
    };
    setFormData({ ...formData, items: newItems });
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const handleSubmit = async () => {
    // Find the selected client to get their extra details if needed
    const selectedClient = clients.find((c) => {
      c.businessName || c.firstName === formData.clientName + formData.cl;
    });

    const orderData = {
      ...formData,
      // Fix the 'id' error: generate a temporary ID or handle via Auto-Increment in DB
      id: `ORD-${Date.now()}`,

      // Add the missing keys that PHP is looking for
      clientPhone: selectedClient?.phone || '',
      clientEmail: selectedClient?.email || '',
      orderType: 'Sales', // or whatever your default type is
      sourceChannel: 'Admin Portal',
      etaDate: '',
      internalNotes: '',
      clientNotes: '',

      // Existing fields
      status: 'pending',
      paymentStatus: 'unpaid',
      totalAmount: totalAmount,
      depositAmount: 0,
      balanceDue: totalAmount,
      orderDate: new Date().toISOString().split('T')[0],
    };

    const success = await addOrder(orderData);

    if (success) {
      onClose();
      setStep(1);
      setFormData({ clientName: '', supplier: '', items: [] });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Create New Order - Step {step} of 2</DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label>Select Client</Label>
              <Select
                onValueChange={(val) =>
                  setFormData({ ...formData, clientName: val })
                }>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a client..." />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {clients?.map((client) => (
                    <SelectItem
                      key={client.id}
                      value={client.businessName || client.firstName}>
                      {client.businessName ||
                        client.firstName + client.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* <div className="space-y-2">
              <Label>Supplier (Optional)</Label>
              <Input
                placeholder="Enter supplier name..."
                value={formData.supplier}
                onChange={(e) =>
                  setFormData({ ...formData, supplier: e.target.value })
                }
              />
            </div> */}
            <div className="flex justify-end border-t pt-4">
              <Button
                onClick={() => setStep(2)}
                disabled={!formData.clientName}>
                Next: Add Parts
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col space-y-4 overflow-hidden">
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 min-h-[200px]">
              {formData.items.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-2 items-end border p-3 rounded-lg bg-muted/30">
                  <div className="flex-1 space-y-1">
                    <Label className="text-xs">Product</Label>
                    <Select
                      onValueChange={(val) => handleProductSelect(index, val)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Part..." />
                      </SelectTrigger>
                      <SelectContent>
                        {products?.map((p) => (
                          <SelectItem key={p.id} value={String(p.id)}>
                            <h3 className="font-bold text-[15px] m-0">
                              {p.title}
                            </h3>
                            <br />
                            <p className="font-light text-[13px] mt-1">
                              {p.description}
                            </p>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-20 space-y-1">
                    <Label className="text-xs">Qty</Label>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(index, e.target.value)
                      }
                    />
                  </div>
                  <div className="w-24 space-y-1">
                    <Label className="text-xs">Price</Label>
                    <div className="text-sm font-bold py-2">
                      R {item.unitPrice}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(index)}
                    className="text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="w-full border-dashed"
                onClick={handleAddItem}>
                <Plus className="w-4 h-4 mr-2" /> Add Part from Inventory
              </Button>
            </div>

            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount:</span>
                <span>R {totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={formData.items.length === 0}>
                  Finalize & Create Order
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderForm;

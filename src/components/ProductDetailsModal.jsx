
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Package } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const DetailRow = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-border last:border-0">
    <span className="text-sm text-muted-foreground font-medium">{label}</span>
    <span className="text-sm text-foreground sm:text-right sm:max-w-[60%]">{value || '-'}</span>
  </div>
);

const ProductDetailsModal = ({ isOpen, onClose, product, onEdit }) => {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b border-border">
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-xl mb-1">{product.title}</DialogTitle>
              <p className="font-mono text-sm text-muted-foreground">{product.sku}</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => onEdit(product)} className="gap-2">
              <Edit className="w-4 h-4" /> Edit
            </Button>
          </div>
        </DialogHeader>
        
        <ScrollArea className="flex-1 px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Image Placeholder */}
            <div className="md:col-span-1">
              <div className="aspect-square bg-muted rounded-xl flex items-center justify-center border border-border">
                <Package className="w-16 h-16 text-muted-foreground/50" />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="secondary">{product.status}</Badge>
                {product.isSpecialOrder && <Badge variant="outline" className="border-blue-200 text-blue-700">Special Order</Badge>}
              </div>
            </div>

            {/* Details */}
            <div className="md:col-span-2 space-y-6">
              
              <div>
                <h4 className="font-semibold mb-3 text-foreground">Description</h4>
                <p className="text-sm text-muted-foreground mb-2">{product.shortDescription}</p>
                <p className="text-sm text-foreground leading-relaxed">{product.fullDescription}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-foreground">Classification</h4>
                <div className="bg-card rounded-lg border border-border px-4">
                  <DetailRow label="Category" value={product.category} />
                  <DetailRow label="Brand" value={product.brand} />
                  <DetailRow label="Engine Type" value={product.engineType} />
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-foreground">Pricing & Supplier</h4>
                <div className="bg-card rounded-lg border border-border px-4">
                  <DetailRow label="Supplier" value={product.supplier} />
                  <DetailRow label="Supplier Part #" value={product.supplierPartNumber} />
                  <DetailRow label="Supplier Cost" value={`$${Number(product.supplierCost).toFixed(2)}`} />
                  <DetailRow label="Markup" value={`${product.markupValue}${product.markupType === 'percentage' ? '%' : '$'}`} />
                  <DetailRow label="Selling Price" value={`$${Number(product.sellingPrice).toFixed(2)}`} />
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-foreground">Inventory</h4>
                <div className="bg-card rounded-lg border border-border px-4">
                  <DetailRow label="Quantity in Stock" value={product.quantity} />
                  <DetailRow label="Minimum Stock Level" value={product.minStockLevel} />
                </div>
              </div>

              {product.notes && (
                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Internal Notes</h4>
                  <div className="bg-muted/50 rounded-lg p-4 text-sm text-foreground">
                    {product.notes}
                  </div>
                </div>
              )}

            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsModal;

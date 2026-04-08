
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Trash2, Eye, AlertTriangle } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const ProductCard = ({ product, onEdit, onDelete, onView }) => {
  
  const getStatusBadge = (status) => {
    switch(status) {
      case 'active': return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case 'out_of_stock': return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Out of Stock</Badge>;
      case 'discontinued': return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Discontinued</Badge>;
      case 'special_order_only': return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Special Order</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="font-mono text-xs text-muted-foreground mb-1">{product.sku}</p>
            <h4 className="font-semibold text-foreground line-clamp-2 leading-tight">{product.title}</h4>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 -mr-2 -mt-2">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onView(product)}>
                <Eye className="mr-2 h-4 w-4" /> View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(product)}>
                <Edit className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(product)} className="text-destructive focus:text-destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary">{product.category}</Badge>
          <Badge variant="outline">{product.brand}</Badge>
          {getStatusBadge(product.status)}
        </div>

        <div className="flex justify-between items-end pt-3 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Stock</p>
            <div className="flex items-center gap-2">
              <span className="font-medium">{product.quantity}</span>
              {product.quantity <= product.minStockLevel && !product.isSpecialOrder && (
                <AlertTriangle className="w-4 h-4 text-destructive" />
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground mb-1">Price</p>
            <p className="font-bold text-lg text-primary">${Number(product.sellingPrice).toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Trash2, Eye, AlertTriangle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ProductTable = ({ products, onEdit, onDelete, onView }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Active
          </Badge>
        );
      case 'out_of_stock':
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            Out of Stock
          </Badge>
        );
      case 'discontinued':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Discontinued
          </Badge>
        );
      case 'special_order_only':
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Special Order
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SKU</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Category / Brand</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead className="text-right">Cost / Price</TableHead>
            <TableHead className="text-center">Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={8}
                className="text-center py-8 text-muted-foreground">
                No products found.
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow
                key={product.id}
                className="hover:bg-muted/50 transition-colors">
                <TableCell className="font-mono text-xs">
                  {product.sku}
                </TableCell>
                <TableCell
                  className="font-medium max-w-[200px] truncate"
                  title={product.title}>
                  {product.title}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm">{product.category}</span>
                    <span className="text-xs text-muted-foreground">
                      {product.brand}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {product.supplier}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground line-through">
                      ${Number(product.supplierCost).toFixed(2)}
                    </span>
                    <span className="font-medium">
                      ${Number(product.sellingPrice).toFixed(2)}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className="font-medium">{product.quantity}</span>
                    {product.quantity <= product.minStockLevel &&
                      !product.isSpecialOrder && (
                        <AlertTriangle
                          className="w-4 h-4 text-destructive"
                          title="Low Stock"
                        />
                      )}
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(product.status)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
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
                      <DropdownMenuItem
                        onClick={() => onDelete(product)}
                        className="text-destructive focus:text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;

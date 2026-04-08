
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const OrderStatusBadge = ({ status }) => {
  const statusConfig = {
    'Active': { variant: 'default', className: 'bg-blue-100 text-blue-800 hover:bg-blue-100' },
    'Awaiting Payment': { variant: 'secondary', className: 'bg-amber-100 text-amber-800 hover:bg-amber-100' },
    'In Transit': { variant: 'default', className: 'bg-purple-100 text-purple-800 hover:bg-purple-100' },
    'Ready for Collection': { variant: 'default', className: 'bg-green-100 text-green-800 hover:bg-green-100' },
    'Completed': { variant: 'default', className: 'bg-slate-100 text-slate-800 hover:bg-slate-100' },
    'Delayed': { variant: 'destructive', className: 'bg-red-100 text-red-800 hover:bg-red-100' },
    'Cancelled': { variant: 'secondary', className: 'bg-gray-100 text-gray-800 hover:bg-gray-100' }
  };

  const config = statusConfig[status] || statusConfig['Active'];

  return (
    <Badge variant={config.variant} className={cn("font-medium", config.className)}>
      {status}
    </Badge>
  );
};

export default OrderStatusBadge;

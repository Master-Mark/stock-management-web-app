
import React from 'react';
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const StockLevelIndicator = ({ current, reorderLevel, className }) => {
  const percentage = (current / reorderLevel) * 100;
  
  let status = 'high';
  let icon = CheckCircle;
  let colorClass = 'text-green-600';
  
  if (percentage <= 50) {
    status = 'low';
    icon = AlertTriangle;
    colorClass = 'text-red-600';
  } else if (percentage <= 100) {
    status = 'medium';
    icon = AlertCircle;
    colorClass = 'text-amber-600';
  }

  const Icon = icon;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Icon className={cn("w-4 h-4", colorClass)} />
      <span className={cn("text-sm font-medium", colorClass)}>
        {current} units
      </span>
    </div>
  );
};

export default StockLevelIndicator;

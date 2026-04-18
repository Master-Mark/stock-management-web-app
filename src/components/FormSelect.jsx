import React from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

const FormSelect = ({
  label,
  options,
  value,
  onValueChange,
  placeholder,
  error,
  className,
  id,
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <Label htmlFor={id} className={error ? 'text-destructive' : ''}>
          {label}
        </Label>
      )}
      <Select value={value || ''} onValueChange={onValueChange}>
        <SelectTrigger
          id={id}
          className={cn(
            'bg-background text-foreground',
            error && 'border-destructive focus:ring-destructive',
          )}>
          <SelectValue placeholder={placeholder || 'Select an option'} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-destructive font-medium">{error}</p>}
    </div>
  );
};

export default FormSelect;


import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const FormCheckbox = ({ label, description, checked, onCheckedChange, id, className }) => {
  return (
    <div className={cn("flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4", className)}>
      <Checkbox 
        id={id} 
        checked={checked} 
        onCheckedChange={onCheckedChange} 
      />
      <div className="space-y-1 leading-none">
        <Label htmlFor={id} className="cursor-pointer">{label}</Label>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
    </div>
  );
};

export default FormCheckbox;

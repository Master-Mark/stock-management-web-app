
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const FormInput = ({ label, error, className, id, ...props }) => {
  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label htmlFor={id} className={error ? "text-destructive" : ""}>{label}</Label>}
      <Input 
        id={id} 
        className={cn(
          "bg-background text-foreground",
          error && "border-destructive focus-visible:ring-destructive"
        )} 
        {...props} 
      />
      {error && <p className="text-sm text-destructive font-medium">{error}</p>}
    </div>
  );
};

export default FormInput;

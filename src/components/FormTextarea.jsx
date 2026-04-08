
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const FormTextarea = ({ label, error, maxLength, value, className, id, ...props }) => {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-center">
        {label && <Label htmlFor={id} className={error ? "text-destructive" : ""}>{label}</Label>}
        {maxLength && (
          <span className="text-xs text-muted-foreground">
            {value?.length || 0}/{maxLength}
          </span>
        )}
      </div>
      <Textarea 
        id={id} 
        value={value}
        maxLength={maxLength}
        className={cn(
          "bg-background text-foreground min-h-[100px] resize-y",
          error && "border-destructive focus-visible:ring-destructive"
        )} 
        {...props} 
      />
      {error && <p className="text-sm text-destructive font-medium">{error}</p>}
    </div>
  );
};

export default FormTextarea;

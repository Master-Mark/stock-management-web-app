
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/FormInput.jsx';
import FormSelect from '@/components/FormSelect.jsx';
import FormTextarea from '@/components/FormTextarea.jsx';
import FormCheckbox from '@/components/FormCheckbox.jsx';
import { ScrollArea } from '@/components/ui/scroll-area';

const defaultFormState = {
  companyName: '',
  supplierCode: '',
  contactPerson: '',
  contactPersonPosition: '',
  phone: '',
  alternatePhone: '',
  email: '',
  website: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  province: '',
  postalCode: '',
  country: '',
  paymentTerms: '',
  leadTimeDays: 0,
  preferredContactMethod: 'Email',
  notes: '',
  isActive: true
};

const SupplierForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(defaultFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({ ...defaultFormState, ...initialData });
    }
  }, [initialData]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.companyName) newErrors.companyName = 'Company name is required';
    if (!formData.contactPerson) newErrors.contactPerson = 'Contact person is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        leadTimeDays: parseInt(formData.leadTimeDays, 10) || 0
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <ScrollArea className="flex-1 pr-4 -mr-4">
        <div className="space-y-6 pb-6">
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Company Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput 
                id="companyName" label="Company Name" value={formData.companyName} 
                onChange={(e) => handleChange('companyName', e.target.value)} 
                error={errors.companyName} 
              />
              <FormInput 
                id="supplierCode" label="Supplier Code" value={formData.supplierCode} 
                onChange={(e) => handleChange('supplierCode', e.target.value)} 
              />
              <FormInput 
                id="website" label="Website" value={formData.website} 
                onChange={(e) => handleChange('website', e.target.value)} 
                className="md:col-span-2"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput 
                id="contactPerson" label="Contact Person" value={formData.contactPerson} 
                onChange={(e) => handleChange('contactPerson', e.target.value)} 
                error={errors.contactPerson} 
              />
              <FormInput 
                id="contactPersonPosition" label="Position" value={formData.contactPersonPosition} 
                onChange={(e) => handleChange('contactPersonPosition', e.target.value)} 
              />
              <FormInput 
                id="phone" label="Phone Number" value={formData.phone} 
                onChange={(e) => handleChange('phone', e.target.value)} 
                error={errors.phone} 
              />
              <FormInput 
                id="alternatePhone" label="Alternate Phone" value={formData.alternatePhone} 
                onChange={(e) => handleChange('alternatePhone', e.target.value)} 
              />
              <FormInput 
                id="email" label="Email Address" type="email" value={formData.email} 
                onChange={(e) => handleChange('email', e.target.value)} 
                error={errors.email} className="md:col-span-2"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Address</h3>
            <FormInput 
              id="addressLine1" label="Address Line 1" value={formData.addressLine1} 
              onChange={(e) => handleChange('addressLine1', e.target.value)} 
            />
            <FormInput 
              id="addressLine2" label="Address Line 2" value={formData.addressLine2} 
              onChange={(e) => handleChange('addressLine2', e.target.value)} 
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput 
                id="city" label="City" value={formData.city} 
                onChange={(e) => handleChange('city', e.target.value)} 
              />
              <FormInput 
                id="province" label="State / Province" value={formData.province} 
                onChange={(e) => handleChange('province', e.target.value)} 
              />
              <FormInput 
                id="postalCode" label="Postal / Zip Code" value={formData.postalCode} 
                onChange={(e) => handleChange('postalCode', e.target.value)} 
              />
              <FormInput 
                id="country" label="Country" value={formData.country} 
                onChange={(e) => handleChange('country', e.target.value)} 
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Business Terms</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput 
                id="paymentTerms" label="Payment Terms" value={formData.paymentTerms} 
                onChange={(e) => handleChange('paymentTerms', e.target.value)} 
                placeholder="e.g. Net 30"
              />
              <FormInput 
                id="leadTimeDays" label="Lead Time (Days)" type="number" min="0" value={formData.leadTimeDays} 
                onChange={(e) => handleChange('leadTimeDays', e.target.value)} 
              />
              <FormSelect 
                id="preferredContactMethod" label="Preferred Contact Method" value={formData.preferredContactMethod} 
                onValueChange={(v) => handleChange('preferredContactMethod', v)} 
                options={[{value: 'Email', label: 'Email'}, {value: 'Phone', label: 'Phone'}]} 
              />
            </div>
            <FormCheckbox 
              id="isActive" label="Active Supplier" 
              description="Uncheck to mark this supplier as inactive."
              checked={formData.isActive} 
              onCheckedChange={(c) => handleChange('isActive', c)} 
            />
            <FormTextarea 
              id="notes" label="Notes" value={formData.notes} 
              onChange={(e) => handleChange('notes', e.target.value)} 
            />
          </div>

        </div>
      </ScrollArea>
      
      <div className="pt-4 border-t mt-auto flex justify-end gap-3 bg-background">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">{initialData ? 'Update Supplier' : 'Create Supplier'}</Button>
      </div>
    </form>
  );
};

export default SupplierForm;

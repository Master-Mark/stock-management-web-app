
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/FormInput.jsx';
import FormSelect from '@/components/FormSelect.jsx';
import FormTextarea from '@/components/FormTextarea.jsx';
import { ScrollArea } from '@/components/ui/scroll-area';

const CLIENT_TYPES = [
  { value: 'Individual', label: 'Individual' },
  { value: 'Business', label: 'Business' }
];

const defaultFormState = {
  type: 'Individual',
  firstName: '',
  lastName: '',
  businessName: '',
  contactPerson: '',
  phone: '',
  alternatePhone: '',
  email: '',
  addressLine1: '',
  addressLine2: '',
  suburb: '',
  city: '',
  province: '',
  postalCode: '',
  notes: ''
};

const ClientForm = ({ initialData, onSubmit, onCancel }) => {
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
    if (formData.type === 'Individual') {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
    } else {
      if (!formData.businessName) newErrors.businessName = 'Business name is required';
      if (!formData.contactPerson) newErrors.contactPerson = 'Contact person is required';
    }
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.email) newErrors.email = 'Email is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <ScrollArea className="flex-1 pr-4 -mr-4">
        <div className="space-y-6 pb-6">
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Client Details</h3>
            <FormSelect 
              id="type" label="Client Type" value={formData.type} 
              onValueChange={(v) => handleChange('type', v)} 
              options={CLIENT_TYPES} 
            />

            {formData.type === 'Individual' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput 
                  id="firstName" label="First Name" value={formData.firstName} 
                  onChange={(e) => handleChange('firstName', e.target.value)} 
                  error={errors.firstName} 
                />
                <FormInput 
                  id="lastName" label="Last Name" value={formData.lastName} 
                  onChange={(e) => handleChange('lastName', e.target.value)} 
                  error={errors.lastName} 
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput 
                  id="businessName" label="Business Name" value={formData.businessName} 
                  onChange={(e) => handleChange('businessName', e.target.value)} 
                  error={errors.businessName} 
                />
                <FormInput 
                  id="contactPerson" label="Contact Person" value={formData.contactPerson} 
                  onChange={(e) => handleChange('contactPerson', e.target.value)} 
                  error={errors.contactPerson} 
                />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                id="suburb" label="Suburb" value={formData.suburb} 
                onChange={(e) => handleChange('suburb', e.target.value)} 
              />
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
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Additional Info</h3>
            <FormTextarea 
              id="notes" label="Notes" value={formData.notes} 
              onChange={(e) => handleChange('notes', e.target.value)} 
            />
          </div>

        </div>
      </ScrollArea>
      
      <div className="pt-4 border-t mt-auto flex justify-end gap-3 bg-background">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">{initialData ? 'Update Client' : 'Create Client'}</Button>
      </div>
    </form>
  );
};

export default ClientForm;

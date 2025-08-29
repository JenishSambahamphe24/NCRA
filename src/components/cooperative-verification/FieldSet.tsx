import React from 'react';

interface FieldSetProps {
  title: string;
  icon?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

const FieldSet: React.FC<FieldSetProps> = ({ title, icon: Icon, children, className = "" }) => (
  <fieldset className={`border border-gray-300 rounded-lg p-4 mb-6 ${className}`}>
    <legend className="text-sm font-semibold px-2 -ml-2 flex items-center">
      {Icon && <Icon className="w-4 h-4 mr-2 text-gray-600" />}
      {title}
    </legend>
    {children}
  </fieldset>
);

export { FieldSet };
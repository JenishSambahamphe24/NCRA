import React from 'react';

interface DataRowProps {
  label: string;
  value: string | number | undefined;
  className?: string;
}

export const DataRow: React.FC<DataRowProps> = ({ label, value, className }) => {
  return (
    <div className={`flex justify-between py-2 border-b border-gray-200 ${className}`}>
      <span className="font-medium text-gray-700">{label}:</span>
      <span className="text-gray-900">{value || 'N/A'}</span>
    </div>
  );
};
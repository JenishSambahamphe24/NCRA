// components/steps/CommitteeStep.jsx
import React from 'react';
import { Users, UserCheck } from 'lucide-react';
import CommitteeMemberForm from '../forms/CommitteeMemberForm';

const CommitteeStep = ({ 
  committees = {},
  committeeMembers = [], 
  onChange,
  onMemberUpdate, 
  onRemoveMember, 
  errors = {},
  email 
}) => {
  console.log('CommitteeStep props:', {
    committees,
    committeeMembers,
    onChange: typeof onChange,
    onMemberUpdate: typeof onMemberUpdate,
    errors
  });

  // Use onChange if available, otherwise fall back to onMemberUpdate
  const handleUpdate = onChange || onMemberUpdate;

  if (!handleUpdate || typeof handleUpdate !== 'function') {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">
          Error: CommitteeStep requires either onChange or onMemberUpdate function prop.
        </p>
        <p className="text-sm text-red-500 mt-1">
          Received onChange: {typeof onChange}, onMemberUpdate: {typeof onMemberUpdate}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Step Header */}
      
      {/* Global Errors */}
      {errors.general && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{errors.general}</p>
        </div>
      )}

      {/* Committee Member Form */}
      <CommitteeMemberForm
        committees={committees}
        onUpdate={handleUpdate}
        errors={errors}
      />
     
    </div>
  );
};

export default CommitteeStep;


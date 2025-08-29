// Updated CommitteeMemberForm.jsx - Input field for member count
import React, { useState } from 'react';
import { UserCheck, Users } from 'lucide-react';
import FormInput from '../common/FormInput';
import { COMMITTEE_MEMBER_FIELDS } from '../../config/formConfig';

const CommitteeMemberForm = ({ 
  committees = {}, 
  onUpdate, 
  errors = {} 
}) => {
  const [committeeConfig, setCommitteeConfig] = useState({
    'board': { 
      count: 1, 
      label: 'Board Committee', 
      members: committees.board && committees.board.length > 0 ? committees.board : [{}] 
    },
    'loan': { 
      count: 1, 
      label: 'Loan Committee', 
      members: committees.loan && committees.loan.length > 0 ? committees.loan : [{}] 
    },
    'audit': { 
      count: 1, 
      label: 'Audit Committee', 
      members: committees.audit && committees.audit.length > 0 ? committees.audit : [{}] 
    },
    'other': { 
      count: 1, 
      label: 'Other Committee', 
      members: committees.other && committees.other.length > 0 ? committees.other : [{}] 
    }
  });

  

  const handleMemberCountChange = (committeeType, newCount) => {
    const count = Math.max(1, Math.min(20, parseInt(newCount) || 1)); // Ensure between 1-20
    const currentConfig = committeeConfig[committeeType];
    
    let updatedMembers = [...currentConfig.members];
    
    // Add new empty members if count increased
    while (updatedMembers.length < count) {
      updatedMembers.push({});
    }
    
    // Remove excess members if count decreased
    if (updatedMembers.length > count) {
      updatedMembers = updatedMembers.slice(0, count);
    }
    
    const updatedConfig = {
      ...committeeConfig,
      [committeeType]: {
        ...currentConfig,
        count,
        members: updatedMembers
      }
    };

    setCommitteeConfig(updatedConfig);
    updateParent(updatedConfig);
  };

  const updateParent = (config) => {
    const allMembers = [];
    Object.keys(config).forEach(type => {
      config[type].members.forEach((member, index) => {
        // Only add members that have at least a name filled
        if (member.firstName || member.lastName) {
          allMembers.push({
            ...member,
            commiteeFormulationAssembly: type, // This matches the data formatter
            id: `${type}-${index}` // Add unique ID
          });
        }
      });
    });
    
    // Call onUpdate if it exists and is a function
    if (onUpdate && typeof onUpdate === 'function') {
      onUpdate(allMembers);
    }
  };

  const handleMemberUpdate = (committeeType, memberIndex, updatedMember) => {
    const updatedConfig = {
      ...committeeConfig,
      [committeeType]: {
        ...committeeConfig[committeeType],
        members: committeeConfig[committeeType].members.map((member, index) =>
          index === memberIndex ? updatedMember : member
        )
      }
    };

    setCommitteeConfig(updatedConfig);
    updateParent(updatedConfig);
  };

  const handleInputChange = (committeeType, memberIndex, e) => {
    const { name, value } = e.target;
    const currentMember = committeeConfig[committeeType].members[memberIndex];
    const updatedMember = { ...currentMember, [name]: value };
    handleMemberUpdate(committeeType, memberIndex, updatedMember);
  };

  const renderMemberForm = (committeeType, member, memberIndex) => {
    return (
      <div key={memberIndex} className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
        <div className="mb-3">
          <h4 className="text-md font-medium text-gray-700">
            {committeeConfig[committeeType].label} - Member {memberIndex + 1}
          </h4>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {COMMITTEE_MEMBER_FIELDS.map((field) => (
            <FormInput
              key={field.name}
              {...field}
              value={member[field.name] || ''}
              onChange={(e) => handleInputChange(committeeType, memberIndex, e)}
              error={errors[`${committeeType}-${memberIndex}-${field.name}`]}
            />
          ))}
        </div>
        
        {/* Divider between member forms */}
        {memberIndex < committeeConfig[committeeType].members.length - 1 && (
          <div className="mt-6 border-b border-gray-300"></div>
        )}
      </div>
    );
  };

  const renderCommitteeFieldset = (committeeType, config) => {
    return (
      <fieldset key={committeeType} className="border-2 rounded-lg p-4 mb-6" style={{ borderColor: '#022B69' }}>
        <legend className="text-lg font-semibold px-2 flex items-center" style={{ color: '#022B69' }}>
          <Users className="mr-2" size={20} style={{ color: '#022B69' }} />
          {config.label}
        </legend>
        
        {/* Member Count Input */}
        <div className="mb-4 flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">
            Number of Members:
          </label>
          <input
            type="number"
            min="1"
            max="20"
            value={config.count}
            onChange={(e) => handleMemberCountChange(committeeType, e.target.value)}
            className="w-20 px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span className="text-xs text-gray-500">(Max: 20)</span>
        </div>

        {/* Member Forms */}
        <div className="space-y-1">
          {config.members.map((member, memberIndex) =>
            renderMemberForm(committeeType, member, memberIndex)
          )}
        </div>
      </fieldset>
    );
  };

  // Safety check
  if (!onUpdate || typeof onUpdate !== 'function') {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">
          Error: CommitteeMemberForm requires an onUpdate prop function.
        </p>
        <p className="text-sm text-red-500 mt-1">
          Received: {typeof onUpdate}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {Object.entries(committeeConfig).map(([committeeType, config]) =>
        renderCommitteeFieldset(committeeType, config)
      )}
    </div>
  );
};

export default CommitteeMemberForm;


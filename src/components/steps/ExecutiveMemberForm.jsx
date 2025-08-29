// src/components/steps/ExecutiveMemberForm.jsx (Fixed Version)
import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  User,
  Calendar,
  Mail,
  Phone,
  GraduationCap,
} from "lucide-react";
import {
  EXECUTIVE_MEMBER_FIELDS,
  getEmptyExecutiveMember,
} from "../../config/formConfig";

const ExecutiveMemberForm = ({
  executiveMembers = [],
  onChange,
  errors = {},
  email,
}) => {
  console.log("ExecutiveMemberForm props:", {
    executiveMembers,
    onChange: typeof onChange,
    errors,
    email,
  });

  const [members, setMembers] = useState([]);

  // Initialize with one empty member if none exist
  useEffect(() => {
    console.log("ExecutiveMemberForm useEffect triggered");

    // Safety check for onChange
    if (!onChange || typeof onChange !== "function") {
      console.error(
        "ExecutiveMemberForm: onChange is not a function!",
        onChange,
      );
      return;
    }

    if (executiveMembers.length === 0) {
      console.log("Creating empty member");
      const emptyMember = getEmptyExecutiveMember();
      if (email) {
        emptyMember.email = email; // Fixed: use lowercase 'email'
      }
      console.log("Setting members to:", [emptyMember]);
      setMembers([emptyMember]);

      try {
        onChange([emptyMember]);
        console.log("onChange called successfully");
      } catch (error) {
        console.error("Error calling onChange:", error);
      }
    } else {
      console.log("Using existing members:", executiveMembers);
      setMembers(executiveMembers);
    }
  }, [executiveMembers.length, email]); // Simplified dependencies

  const handleMemberChange = (index, field, value) => {
    console.log("handleMemberChange called:", { index, field, value });

    if (!onChange || typeof onChange !== "function") {
      console.error("ExecutiveMemberForm: onChange prop is not a function");
      return;
    }

    const updatedMembers = [...members];
    updatedMembers[index] = {
      ...updatedMembers[index],
      [field]: value,
    };
    setMembers(updatedMembers);

    try {
      onChange(updatedMembers);
    } catch (error) {
      console.error("Error in handleMemberChange onChange:", error);
    }
  };

  const addMember = () => {
    console.log("addMember called");

    if (!onChange || typeof onChange !== "function") {
      console.error("ExecutiveMemberForm: onChange prop is not a function");
      return;
    }

    const newMember = getEmptyExecutiveMember();
    if (email) {
      newMember.email = email; // Fixed: use lowercase 'email'
    }
    const updatedMembers = [...members, newMember];
    setMembers(updatedMembers);

    try {
      onChange(updatedMembers);
    } catch (error) {
      console.error("Error in addMember onChange:", error);
    }
  };

  const removeMember = (index) => {
    console.log("removeMember called:", index);

    if (!onChange || typeof onChange !== "function") {
      console.error("ExecutiveMemberForm: onChange prop is not a function");
      return;
    }

    if (members.length > 1) {
      const updatedMembers = members.filter((_, i) => i !== index);
      setMembers(updatedMembers);

      try {
        onChange(updatedMembers);
      } catch (error) {
        console.error("Error in removeMember onChange:", error);
      }
    }
  };

  const getFieldIcon = (fieldName) => {
    switch (fieldName) {
      case "email":
        return Mail;
      case "phoneNumber":
        return Phone;
      case "highestEducation":
        return GraduationCap;
      case "dateOfAppointment":
      case "termEnd":
        return Calendar;
      default:
        return User;
    }
  };

  const renderField = (field, memberIndex, member) => {
    const fieldKey = `${memberIndex}-${field.name}`;
    const fieldError = errors[fieldKey];
    const Icon = getFieldIcon(field.name);

    const baseInputClasses = `
      w-full px-3 py-2 pl-10 border rounded-lg transition-all duration-200
      focus:ring-2 focus:ring-blue-500 focus:border-blue-500
      ${fieldError ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-gray-400"}
      ${field.disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
    `;

    return (
      <div key={fieldKey} className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>

        <div className="relative">
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />

          {field.type === "select" ? (
            <select
              value={member[field.name] || ""}
              onChange={(e) =>
                handleMemberChange(memberIndex, field.name, e.target.value)
              }
              className={baseInputClasses}
              disabled={field.disabled}
            >
              <option value="">Select {field.label}</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : field.type === "date" ? (
            <input
              type="date"
              value={member[field.name] || ""}
              onChange={(e) =>
                handleMemberChange(memberIndex, field.name, e.target.value)
              }
              className={baseInputClasses}
              disabled={field.disabled}
            />
          ) : field.type === "number" ? (
            <input
              type="number"
              value={member[field.name] || ""}
              onChange={(e) =>
                handleMemberChange(memberIndex, field.name, e.target.value)
              }
              placeholder={field.placeholder}
              className={baseInputClasses}
              disabled={field.disabled}
              min="0"
            />
          ) : (
            <input
              type={field.type || "text"}
              value={member[field.name] || ""}
              onChange={(e) =>
                handleMemberChange(memberIndex, field.name, e.target.value)
              }
              placeholder={field.placeholder}
              className={baseInputClasses}
              disabled={field.disabled}
            />
          )}
        </div>

        {fieldError && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
            {fieldError}
          </p>
        )}
      </div>
    );
  };

  // Safety check before rendering
  if (!onChange) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">
          Error: ExecutiveMemberForm requires an onChange prop function.
        </p>
        <p className="text-sm text-red-500 mt-1">
          Received: {typeof onChange} - {String(onChange)}
        </p>
      </div>
    );
  }

  // Check if EXECUTIVE_MEMBER_FIELDS is defined
  if (!EXECUTIVE_MEMBER_FIELDS || !Array.isArray(EXECUTIVE_MEMBER_FIELDS)) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-600">
          Error: EXECUTIVE_MEMBER_FIELDS is not properly configured.
        </p>
        <p className="text-sm text-yellow-500 mt-1">
          Please check the formConfig import.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {members.map((member, index) => (
        <div
          key={member.id || index}
          className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm"
        >
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-medium text-gray-800 flex items-center">
              <User className="h-5 w-5 text-gray-600 mr-2" />
              Executive Member {index + 1}
            </h4>
            {members.length > 1 && (
              <button
                type="button"
                onClick={() => removeMember(index)}
                className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 transition-colors"
                title="Remove member"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {EXECUTIVE_MEMBER_FIELDS.map((field) =>
              renderField(field, index, member),
            )}
          </div>
        </div>
      ))}

      <div className="flex justify-center">
        <button
          type="button"
          onClick={addMember}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg transition-colors shadow-sm"
        >
          <Plus className="h-3 w-3 mr-2" />
          Add Executive Member
        </button>
      </div>

      {members.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <User className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p>
            No executive members added yet. Click "Add Executive Member" to get
            started.
          </p>
        </div>
      )}
    </div>
  );
};

export default ExecutiveMemberForm;

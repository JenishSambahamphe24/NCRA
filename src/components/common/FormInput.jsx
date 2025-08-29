// components/ui/FormInput.jsx
import React from "react";

const FormInput = ({
  label,
  name,
  type = "text",
  required,
  options,
  value,
  onChange,
  error,
  placeholder,
  rows = 3,
  disabled,
  formSteps,
  email,
}) => {
  const inputClasses = `w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
    error ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
  }`;

  const renderInput = () => {
    if (type === "textarea") {
      return (
        <textarea
          name={name}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={inputClasses}
          required={required}
          disabled={disabled}
        />
      );
    }

    if (type === "select") {
      return (
        <select
          name={name}
          value={value || ""}
          onChange={onChange}
          className={inputClasses}
          required={required}
          disabled={disabled}
        >
          <option value="">Select {label}</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    if (type === "file") {
      return (
        <input
          type="file"
          name={name}
          onChange={onChange}
          className={inputClasses}
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          required={required}
          disabled={disabled}
        />
      );
    }

    return (
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClasses}
        required={required}
        disabled={disabled}
      />
    );
  };

  return (
    <div className="mb-1">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderInput()}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;

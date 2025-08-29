import React, { useState } from 'react';
import { File, AlertCircle, X, Upload } from 'lucide-react';

const FILE_CONSTRAINTS = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: [
    'application/pdf',
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/csv'
  ]
};

const DocumentUploadForm = ({ step, formData, onChange, errors, existingData }) => {
  const [uploadedFiles, setUploadedFiles] = useState({});

  const validateFile = (file) => {
    const errors = [];
    if (file.size > FILE_CONSTRAINTS.maxSize) {
      errors.push(`File size must be less than ${FILE_CONSTRAINTS.maxSize / (1024 * 1024)}MB`);
    }
    if (!FILE_CONSTRAINTS.allowedTypes.includes(file.type)) {
      errors.push('File type not supported. Please upload PDF, JPG, PNG, DOC, XLS, or CSV files.');
    }
    return errors;
  };

  const handleFileUpload = (fieldName, file) => {
    if (!file) return;
    
    const validationErrors = validateFile(file);
    if (validationErrors.length > 0) {
      alert(validationErrors.join('\n'));
      return;
    }

    setUploadedFiles(prev => ({
      ...prev,
      [fieldName]: file
    }));

    const event = {
      target: {
        name: fieldName,
        files: [file],
        type: 'file',
      },
    };
    onChange(event);
  };

  const removeFile = (fieldName) => {
    setUploadedFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[fieldName];
      return newFiles;
    });

    const event = {
      target: {
        name: fieldName,
        files: [],
        type: 'file',
      },
    };
    onChange(event);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  // Render select field (for FiscalYearId)
  const renderSelectField = (field) => {
    return (
      <div key={field.name} className="bg-white rounded-lg border border-gray-200 p-4">
        <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-2">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <select
          id={field.name}
          name={field.name}
          value={formData[field.name] || ''}
          onChange={(e) => {
            const event = {
              target: {
                name: field.name,
                value: e.target.value,
                type: 'select',
              },
            };
            onChange(event);
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">{field.placeholder || 'Select an option'}</option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors[field.name] && (
          <div className="flex items-center space-x-2 text-red-600 text-sm mt-2">
            <AlertCircle className="h-4 w-4" />
            <span>{errors[field.name]}</span>
          </div>
        )}
      </div>
    );
  };

  // Render text field (for Remarks)
  const renderTextField = (field) => {
    return (
      <div key={field.name} className="bg-white rounded-lg border border-gray-200 p-4">
        <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-2">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {field.type === 'textarea' ? (
          <textarea
            id={field.name}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={(e) => {
              const event = {
                target: {
                  name: field.name,
                  value: e.target.value,
                  type: 'textarea',
                },
              };
              onChange(event);
            }}
            placeholder={field.placeholder}
            rows={field.rows || 4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
          />
        ) : (
          <input
            type="text"
            id={field.name}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={(e) => {
              const event = {
                target: {
                  name: field.name,
                  value: e.target.value,
                  type: 'text',
                },
              };
              onChange(event);
            }}
            placeholder={field.placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        )}
        {errors[field.name] && (
          <div className="flex items-center space-x-2 text-red-600 text-sm mt-2">
            <AlertCircle className="h-4 w-4" />
            <span>{errors[field.name]}</span>
          </div>
        )}
      </div>
    );
  };

  // Render file field
  const renderFileField = (field) => {
    const fieldValue = formData[field.name];
    const uploadedFile = uploadedFiles[field.name];
    const hasFile = uploadedFile || (fieldValue && fieldValue.length > 0);
    const file = uploadedFile || (fieldValue && fieldValue.length > 0 ? fieldValue[0] : null);
    const existingFile = existingData?.[field.name];

    return (
      <div key={field.name} className="bg-white rounded-lg border border-gray-200 p-3">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>

        <div className="space-y-2">
          <input
            type="file"
            id={field.name}
            className="hidden"
            accept={field.accept || FILE_CONSTRAINTS.allowedTypes.join(',')}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) handleFileUpload(field.name, file);
            }}
          />
          
          <label 
            htmlFor={field.name} 
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            <Upload className="h-3 w-3 mr-1" />
            Choose
          </label>

          {/* Show selected file */}
          {file && (
            <div className="flex items-center justify-between bg-green-50 p-2 rounded border border-green-200">
              <div className="flex items-center space-x-2">
                <File className="h-4 w-4 text-green-500" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-gray-900 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile(field.name)}
                className="text-red-500 hover:text-red-700 p-1 ml-2"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          
          {/* Show existing file if no new upload */}
          {!file && existingFile && (
            <div className="bg-blue-50 p-2 rounded border border-blue-200">
              <div className="flex items-center space-x-2">
                <File className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-xs font-medium text-gray-900">File uploaded</p>
                  <p className="text-xs text-gray-500">Previously uploaded</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {errors[field.name] && (
          <div className="flex items-center space-x-1 text-red-600 text-xs mt-2">
            <AlertCircle className="h-3 w-3" />
            <span>{errors[field.name]}</span>
          </div>
        )}
      </div>
    );
  };

  // Separate fields by type
  const selectFields = step.fields.filter(field => field.type === 'select');
  const textFields = step.fields.filter(field => field.type === 'text' || field.type === 'textarea');
  const fileFields = step.fields.filter(field => field.type === 'file' || !field.type);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
          <File className="h-5 w-5 mr-2 text-blue-600" />
          {step.title}
        </h2>
        {step.description && (
          <p className="text-sm text-gray-600">{step.description}</p>
        )}
      </div>

      {/* Select fields - full width */}
      {selectFields.length > 0 && (
        <div className="grid gap-4">
          {selectFields.map(renderSelectField)}
        </div>
      )}

      {/* File fields - multiple per row */}
      {fileFields.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {fileFields.map(renderFileField)}
        </div>
      )}

      {/* Text fields - full width */}
      {textFields.length > 0 && (
        <div className="grid gap-4">
          {textFields.map(renderTextField)}
        </div>
      )}

      {/* Progress indicator for files only */}
      {fileFields.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">File Upload Progress:</span>
            <span className="font-medium text-gray-700">
              {fileFields.filter(field => 
                uploadedFiles[field.name] || 
                (formData[field.name]?.length > 0) ||
                existingData?.[field.name]
              ).length} / {fileFields.length} files
            </span>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  (fileFields.filter(field => 
                    uploadedFiles[field.name] || 
                    (formData[field.name]?.length > 0) ||
                    existingData?.[field.name]
                  ).length / fileFields.length) * 100
                }%`
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUploadForm;


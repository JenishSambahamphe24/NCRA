// src/components/steps/CoopsMemberForm.jsx - CORRECTED FILE UPLOAD VERSION
import React, { useState } from "react";
import {
  Download,
  Upload,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle,
  X,
} from "lucide-react";
import Papa from "papaparse";

const CoopsMemberForm = ({ formData = {}, onChange, errors = {} }) => {
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [importFile, setImportFile] = useState(null);
  const [importErrors, setImportErrors] = useState([]);
  const [importSuccess, setImportSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const downloadTemplate = () => {
    // Create a link to download the CSV file from public assets
    const link = document.createElement("a");
    link.href = "/assets/TemplateFile.xlsx"; // Path to your Excel file in public/assets
    link.download = "coops_members_template.xlsx"; // Name for the downloaded file
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // FIXED: Handle file change with proper validation and parent notification
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    console.log("File selected:", file); // Debug log

    if (!file) {
      console.log("No file selected");
      return;
    }

    const fileType = file.name.split(".").pop().toLowerCase();
    if (!["csv", "xlsx", "xls"].includes(fileType)) {
      setImportErrors(["Please upload a CSV or Excel file"]);
      return;
    }

    console.log("Valid file type:", fileType); // Debug log
    console.log("File details:", {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    });

    // FIXED: Properly notify parent component with the file
    if (onChange) {
      const fakeEvent = {
        target: {
          name: "file",
          value: file, // Pass the actual File object
          type: "file",
          files: [file], // Also include files array for compatibility
        },
      };

      console.log("Calling onChange with file:", fakeEvent); // Debug log
      onChange(fakeEvent);
    }

    setImportFile(file);
    setImportErrors([]);
    setImportSuccess(true);
    setTimeout(() => setImportSuccess(false), 3000);
  };

  const processImportFile = () => {
    if (!importFile) return;

    setIsProcessing(true);
    setImportErrors([]);

    if (importFile.name.toLowerCase().endsWith(".csv")) {
      Papa.parse(importFile, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: (results) => {
          if (results.errors.length > 0) {
            setImportErrors(
              results.errors.map((err) => `CSV parsing error: ${err.message}`),
            );
          } else {
            // Validate required columns
            const requiredColumns = ["member_id", "name", "email"];
            const headers = results.meta.fields || [];
            const missingColumns = requiredColumns.filter(
              (col) => !headers.includes(col),
            );

            if (missingColumns.length > 0) {
              setImportErrors([
                `Missing required columns: ${missingColumns.join(", ")}`,
              ]);
            } else {
              setImportSuccess(true);
              setShowBulkImport(false);
              setTimeout(() => setImportSuccess(false), 3000);
            }
          }
          setIsProcessing(false);
        },
        error: (error) => {
          setImportErrors([`CSV parsing error: ${error.message}`]);
          setIsProcessing(false);
        },
      });
    } else {
      setImportErrors([
        "Excel file processing not implemented yet. Please use CSV format.",
      ]);
      setIsProcessing(false);
    }
  };

  // FIXED: Reset import with proper parent notification
  const resetImport = () => {
    setImportFile(null);
    setImportErrors([]);
    setImportSuccess(false);
    setShowBulkImport(false);

    // FIXED: Clear parent form data properly
    if (onChange) {
      const fakeEvent = {
        target: {
          name: "file",
          value: null,
          type: "file",
          files: [],
        },
      };
      onChange(fakeEvent);
    }
  };

  // Get the current file from either formData or local state
  const currentFile = formData.file || importFile;

  console.log("Current file in CoopsMemberForm:", currentFile); // Debug log
  console.log("FormData in CoopsMemberForm:", formData); // Debug log

  return (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={downloadTemplate}
              className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Download className="h-4 w-4 mr-1" />
              Template
            </button>
            <button
              type="button"
              onClick={() => setShowBulkImport(!showBulkImport)}
              className="flex items-center px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-[#1a3a7a] transition-colors text-sm"
            >
              <Upload className="h-4 w-4 mr-1" />
              Bulk Import
            </button>
          </div>
        </div>
        <p className="text-primary text-sm">
          Upload a CSV or Excel file containing cooperative member data.
        </p>
        <p className="text-red-500 text-sm">
          1.रातो कलर गरेको कोलममा खाली नछोड्नुहोला । यदि त्यस्तो भएमा डाटा अपलोड
          हुदैन
        </p>
        <p className="text-red-500 text-sm">
          2. Date को विवरण प्रविष्ट गर्दा YYYY/MM/DD यानकी (४ अंकको वर्ष/२ अंकको
          महिना/२ अंकको दिन) नै हुनुपर्ने छ । YYYY/MM/DD को वीचमा कुनै खाली ठाँउ
          नछोड्नुहोला ।
        </p>
        <p className="text-red-500 text-sm">
          3. महिला, जातजाती, प्रदेश, जिल्ल, स्थानिय तहको विवरण दिएको अप्सनबाट
          छान्नुहोला ।
        </p>
      </div>

      {importSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center">
          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
          <span className="text-green-800 text-sm">
            File uploaded successfully!
          </span>
        </div>
      )}

      {importErrors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="flex items-center mb-2">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
            <span className="text-red-800 text-sm font-medium">
              Upload Errors:
            </span>
          </div>
          <ul className="text-red-700 text-sm space-y-1">
            {importErrors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Members File{" "}
            {errors.file && <span className="text-red-500">*</span>}
          </label>
          <input
            type="file"
            name="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
          />
          {errors.file && (
            <p className="text-red-500 text-sm mt-1">{errors.file}</p>
          )}
          <p className="text-gray-500 text-xs mt-1">
            Upload a CSV or Excel file containing member information
          </p>
        </div>

        {currentFile && (
          <div className="bg-blue-50 border border-blue-200 rounded p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileSpreadsheet className="h-4 w-4 text-blue-600 mr-2" />
                <span className="text-blue-800 text-sm">
                  File uploaded: {currentFile.name}
                </span>
                <span className="text-blue-600 text-xs ml-2">
                  ({(currentFile.size / 1024).toFixed(1)} KB)
                </span>
              </div>
              <button
                type="button"
                onClick={resetImport}
                className="text-blue-600 hover:text-blue-800 text-sm transition-colors flex items-center"
              >
                <X className="h-4 w-4 mr-1" />
                Remove
              </button>
            </div>
          </div>
        )}

        {isProcessing && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600 mr-2"></div>
            <span className="text-yellow-800 text-sm">Processing file...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoopsMemberForm;

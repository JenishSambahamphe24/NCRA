import {
  Building,
  Users,
  MapPin,
  FileText,
  Upload,
  UserCheck,
  UsersIcon,
  DollarSign,
} from "lucide-react";

export const formSteps = [

  {
    id: "basic",
    title: "Basic Info",
    description: "Provide basic information about the cooperative.",
    icon: Building,
    fields: [
      {
        name: "id",
        label: "id",
        hidden: true,
      },
      {
        name: "cooperativeCode",
        label: "Cooperative Code",
        required: true,
        placeholder: "Enter cooperative code",
        width: "w-48",
      },
      {
        name: "fiscalYearId",
        label: "Fiscal Year",
        required: true,
        type: "select",
        placeholder: "Select fiscal year",
        options: [{ value: 1, label: "2080/81" }],
        width: "w-40",
      },
      {
        name: "coopsFullNameNep",
        label: "Full Cooperative Name (Nepali)",
        required: true,
        placeholder: "सहकारीको पूरा नाम",
        width: "w-98",
      },
      {
        name: "coopsFullNameEng",
        label: "Full Cooperative Name (English)",
        required: true,
        placeholder: "Enter full name in English",
        width: "w-96",
      },
      {
        name: "contactEmail",
        label: "Contact Email",
        type: "email",
        required: true,
        placeholder: "contact@example.com",
        width: "w-69",
      },
      {
        name: "registeredDateNep",
        label: "Registered Date (Nepali)",
        type: "nepali-date",
        placeholder: "2080/09/09 (YYYY/MM/DD)",
        width: "w-52",
      },
      {
        name: "registerDate",
        label: "Registered Date",
        type: "date",
        required: true,
        width: "w-[200px]",
      },
      {
        name: "registerYear",
        label: "Register Year",
        required: true,
        placeholder: "Enter register year",
        type: "text",
        width: "w-[200px]",
      },
      {
        name: "registeredFiscalYear",
        label: "Registered Fiscal Year",
        required: true,
        placeholder: "Enter registered fiscal year",
        type: "text",
        width: "w-50",
      },
      {
        name: "classificationOfCooperative",
        label: "Registered At",
        type: "select",
        required: true,
        options: [
          { value: "Federal", label: "Federal" },
          { value: "Province", label: "Province" },
          { value: "LocalLevel", label: "Local Level" },
        ],
        width: "w-44",
      },
      {
        name: "contactMobilePhone",
        label: "Contact Mobile",
        type: "tel",
        required: true,
        placeholder: "98XXXXXXXX",
        width: "w-40",
      },
      {
        name: "contactOfficePhone",
        label: "Office Phone",
        type: "tel",
        placeholder: "01-XXXXXXX",
        width: "w-40",
      },
      {
        name: "webUrl",
        label: "Website URL",
        type: "url",
        placeholder: "https://example.com",
        width: "w-65",
      },
      {
        name: "contactPerson",
        label: "Contact Person",
        required: true,
        placeholder: "Enter contact person name",
        width: "w-55",
      },
      {
        name: "contactPhone",
        label: "Contact Phone",
        type: "tel",
        required: true,
        placeholder: "98XXXXXXXX",
        width: "w-40",
      },
      {
        name: "panNo",
        label: "PAN Number",
        required: true,
        placeholder: "Enter PAN number",
        width: "w-40",
      },
      {
        name: "registrationNo",
        label: "Registration Number",
        required: true,
        placeholder: "Enter registration number",
        width: "w-45",
      },
      {
        name: "workingArea",
        label: "Working Area",
        type: "select",
        required: true,
        options: [
          { value: "urban", label: "Urban" },
          { value: "rural", label: "Rural" },
          { value: "both", label: "Both" },
        ],
        width: "w-42",
      },
      {
        name: "anyBranchOffice",
        label: "Any Branch Office?",
        type: "select",
        options: [
          { value: true, label: "Yes" },
          { value: false, label: "No" },
        ],
        width: "w-50",
      },
      {
        name: "numberOfBranch",
        label: "Number of Branches",
        type: "number",
        placeholder: "Number of branches",
        width: "w-49",
        conditional: "anyBranchOffice",
        conditionalValue: true,
      },
      {
        name: "coopsLogo",
        label: "Cooperative Logo",
        type: "file",
        placeholder: "Upload cooperative logo",
        width: "w-49",
      },
      {
        name: "registeredFederation",
        label: "Is registered in any Federation?",
        type: "select",
        options: [
          { value: true, label: "Yes" },
          { value: false, label: "No" },
        ],
        width: "w-80",
      },
      // Federation checkboxes - only show when registeredFederation is true
      {
        name: "dscu",
        label: "District Subjective Cooperative Union Ltd.",
        type: "checkbox",
        width: "w-full",
        conditional: "registeredFederation",
        conditionalValue: true,
      },
      {
        name: "dcu",
        label: "District Cooperative Union Ltd.",
        type: "checkbox",
        width: "w-full",
        conditional: "registeredFederation",
        conditionalValue: true,
      },
      {
        name: "pscu",
        label: "Provincial Subjective Cooperative Union Ltd.",
        type: "checkbox",
        width: "w-full",
        conditional: "registeredFederation",
        conditionalValue: true,
      },
      {
        name: "pcu",
        label: "Provincial Cooperative Union Ltd.",
        type: "checkbox",
        width: "w-full",
        conditional: "registeredFederation",
        conditionalValue: true,
      },
      {
        name: "cscu",
        label: "Central Subjective Cooperative Union Ltd.",
        type: "checkbox",
        width: "w-full",
        conditional: "registeredFederation",
        conditionalValue: true,
      },
      {
        name: "ncf",
        label: "National Cooperative Federation Ltd.",
        type: "checkbox",
        width: "w-full",
        conditional: "registeredFederation",
        conditionalValue: true,
      },
    ],
  },
  {
    id: "address",
    title: "Address Info",
    description: "Enter the address details of the cooperative.",
    icon: MapPin,
    isAddressStep: true,
    fields: [
      {
        name: "id",
        label: "id",
        hidden: true,
      },
      {
        name: "province",
        label: "Province",
        type: "select",
        options: [
          { value: "province-1", label: "Province 1" },
          { value: "province-2", label: "Province 2" },
          { value: "bagmati", label: "Bagmati Province" },
          { value: "gandaki", label: "Gandaki Province" },
          { value: "lumbini", label: "Lumbini Province" },
          { value: "karnali", label: "Karnali Province" },
          { value: "sudurpashchim", label: "Sudurpashchim Province" },
        ],
        width: "w-52", // Medium-large width for province names
      },
      {
        name: "district",
        label: "District",
        type: "text",
        placeholder: "Enter district",
        width: "w-48", // Medium-large width for district names
      },
      {
        name: "localLevel",
        label: "Local Level",
        type: "text",
        placeholder: "Enter local level",
        width: "w-56", // Large width for local level names
      },
      {
        name: "wardNo",
        label: "Ward Number",
        type: "number",
        placeholder: "Enter ward number",
        width: "w-28", // Small width for ward number
      },
      {
        name: "houseNo",
        label: "House Number",
        type: "text",
        placeholder: "Enter house number",
        width: "w-36", // Small-medium width for house number
      },
      {
        name: "tole",
        label: "Tole/Street",
        type: "text",
        placeholder: "Enter tole or street name",
        width: "w-64", // Large width for street names
      },
    ],
  },
  {
    id: "financial",
    title: "Financial Info",
    description: "Provide financial details of the cooperative.",
    icon: DollarSign,
    fields: [
      {
        name: "id",
        label: "id",
        hidden: true,
      },
      {
        name: "totalShareAmount",
        label: "Total Share Amount",
        type: "number",
        required: true,
        placeholder: "Enter total share amount",
        width: "w-60", // Medium-large width for monetary amounts
      },
      {
        name: "numberOfTotalShare",
        label: "Total Number of Shares",
        type: "number",
        required: true,
        placeholder: "Enter total number of shares",
        width: "w-70", // Medium width for share count
      },
      {
        name: "noOfTotalMaleMember",
        label: "Total Male Members",
        type: "number",
        required: true,
        placeholder: "Enter number of male members",
        width: "w-60", // Small-medium width for member count
      },
      {
        name: "noOfTotalFemaleMember",
        label: "Total Female Members",
        type: "number",
        required: true,
        placeholder: "Enter number of female members",
        width: "w-60", // Small-medium width for member count
      },
      {
        name: "totalSavingAmount",
        label: "Total Saving Amount",
        type: "number",
        placeholder: "Enter total saving amount",
        width: "w-48", // Medium-large width for monetary amounts
      },
      {
        name: "totalLiabilities",
        label: "Total Liabilities",
        type: "number",
        placeholder: "Enter total liabilities",
        width: "w-48", // Medium-large width for monetary amounts
      },
      {
        name: "loanInOperation",
        label: "Loan in Operation",
        type: "number",
        placeholder: "Enter loan in operation",
        width: "w-48", // Medium-large width for monetary amounts
      },
      {
        name: "totalAmountOfInstitutionalAssets",
        label: "Total Institutional Assets",
        type: "number",
        placeholder: "Enter total institutional assets",
        width: "w-52", // Large width for large monetary amounts
      },
    ],
  },

  {
    id: "committee",
    title: "Committee",
    icon: Users,
    isCommitteeStep: true,
    fields: [
      {
        name: "id",
        label: "id",
        hidden: true,
      },
      {
        name: "committeeFormulationAssembly",
        label: "Committee Type",
        type: "select",
        required: true,
        options: [
          { value: "executive", label: "Executive Committee" },
          { value: "supervisory", label: "Supervisory Committee" },
          { value: "other", label: "Other" },
        ],
        width: "w-52",
      },
      {
        name: "position",
        label: "Position",
        type: "select",
        required: true,
        options: [
          { value: "president", label: "President" },
          { value: "vice-president", label: "Vice President" },
          { value: "secretary", label: "Secretary" },
          { value: "treasurer", label: "Treasurer" },
          { value: "member", label: "Member" },
        ],
        width: "w-44",
      },
      {
        name: "firstName",
        label: "First Name",
        required: true,
        placeholder: "Enter first name",
        width: "w-44",
      },
      {
        name: "middleName",
        label: "Middle Name",
        placeholder: "Enter middle name",
        width: "w-44",
      },
      {
        name: "lastName",
        label: "Last Name",
        required: true,
        placeholder: "Enter last name",
        width: "w-44",
      },
      {
        name: "gender",
        label: "Gender",
        type: "select",
        required: true,
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "other", label: "Other" },
        ],
        width: "w-32",
      },
      {
        name: "ethnicity",
        label: "Ethnicity",
        placeholder: "Enter ethnicity",
        width: "w-40",
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        required: true,
        placeholder: "member@example.com",
        width: "w-72",
      },
      {
        name: "phoneNumber",
        label: "Phone Number",
        type: "tel",
        required: true,
        placeholder: "98XXXXXXXX",
        width: "w-40",
      },
      {
        name: "panNo",
        label: "PAN Number",
        placeholder: "Enter PAN number",
        width: "w-40",
      },
      {
        name: "nid",
        label: "National ID",
        placeholder: "Enter National ID",
        width: "w-44",
      },
      {
        name: "province",
        label: "Province",
        type: "select",
        required: true,
        options: [
          { value: "koshi", label: "Koshi" },
          { value: "madhesh", label: "Madhesh" },
          { value: "bagmati", label: "Bagmati" },
          { value: "gandaki", label: "Gandaki" },
          { value: "lumbini", label: "Lumbini" },
          { value: "karnali", label: "Karnali" },
          { value: "sudurpashchim", label: "Sudurpashchim" },
        ],
        width: "w-40",
      },
      {
        name: "district",
        label: "District",
        required: true,
        placeholder: "Enter district name",
        width: "w-48",
      },
      {
        name: "localLevel",
        label: "Local Level",
        required: true,
        placeholder: "Enter local level",
        width: "w-52",
      },
      {
        name: "wardNo",
        label: "Ward No.",
        required: true,
        placeholder: "Enter ward number",
        width: "w-28",
      },
      {
        name: "houseNumber",
        label: "House No.",
        placeholder: "Enter house number",
        width: "w-32",
      },
      {
        name: "tole",
        label: "Tole/Street",
        placeholder: "Enter tole or street name",
        width: "w-56",
      },
      {
        name: "highestEducation",
        label: "Highest Education",
        type: "select",
        options: [
          { value: "primary", label: "Primary" },
          { value: "secondary", label: "Secondary" },
          { value: "higher-secondary", label: "Higher Secondary" },
          { value: "bachelors", label: "Bachelors" },
          { value: "masters", label: "Masters" },
          { value: "doctorate", label: "Doctorate" },
        ],
        width: "w-48",
      },
      {
        name: "panCard",
        label: "PAN Card",
        type: "file",
        accept: ".pdf,.jpg,.jpeg,.png",
        width: "w-full",
      },
      {
        name: "nidCard",
        label: "National ID Card",
        type: "file",
        accept: ".pdf,.jpg,.jpeg,.png",
        width: "w-full", // Full width for file inputs
      },
    ],
  },

  {
    id: "executive",
    title: "Executive Members",
    description: "Add details of the executive members.",
    icon: UserCheck,
    isExecutiveStep: true,
  },
  {
    id: "coopsMembers",
    title: "Cooperative Members",
    description: "Upload cooperative members data.",
    icon: UsersIcon,
    isCoopsMembersStep: true,
    fields: [
      {
        name: "id",
        label: "id",
        hidden: true,
      },
      {
        name: "file",
        label: "Import Members",
        type: "file",
        accept: ".csv,.xlsx,.xls",
        placeholder: "Upload CSV or Excel file",
        width: "w-full"
      },
    ],
  },
  {
    id: "documents",
    title: "Documents",
    description: "Upload relevant documents.",
    icon: FileText,
    fields: [
      {
        name: "id",
        label: "id",
        hidden: true,
      },
      {
        name: "businessRegisterCertificate",
        label: "Business Registration Certificate",
        type: "file",
        accept: ".pdf,.jpg,.jpeg,.png",
        width: "w-full", // Full width for file inputs
      },
      {
        name: "panRegisterCertificate",
        label: "PAN Certificate",
        type: "file",
        accept: ".pdf,.jpg,.jpeg,.png",
        width: "w-full", // Full width for file inputs
      },
      {
        name: "otherRegisterCertificate",
        label: "Other Business Related Certificate",
        type: "file",
        accept: ".pdf,.jpg,.jpeg,.png",
        width: "w-full", // Full width for file inputs
      },
      {
        name: "approvalbyLaw",
        label: "Approval bylaw of cooperatives",
        type: "file",
        accept: ".pdf,.jpg,.jpeg,.png",
        width: "w-full", // Full width for file inputs
      },
      {
        name: "feasibilityReport",
        label: "Feasibility report for cooperative operation",
        type: "file",
        accept: ".pdf,.jpg,.jpeg,.png",
        width: "w-full", // Full width for file inputs
      },
      {
        name: "remark",
        label: "Remarks",
        type: "textarea",
        placeholder: "Enter any additional remarks",
        rows: 4,
        width: "w-full",
      },
    ],
  },
  {
    id: "officialDocuments",
    title: "Official Documents",
    description: "Upload official documents.",
    icon: Upload,
    fields: [
      {
        name: "id",
        label: "id",
        hidden: true,
      },
      {
        name: "fiscalYearId",
        label: "Fiscal Year",
        type: "select",
        placeholder: "Select fiscal year",
        options: [{ value: 1, label: "2080/81" }],
        width: "w-40", // Small-medium width for fiscal year
      },
      {
        name: "auditReport",
        label: "Audit Report",
        type: "file",
        accept: ".pdf,.jpg,.jpeg,.png",
        width: "w-full", // Full width for file inputs
      },
      {
        name: "taxClearance",
        label: "Tax clearance",
        type: "file",
        accept: ".pdf,.jpg,.jpeg,.png",
        width: "w-full", // Full width for file inputs
      },
      {
        name: "boardMeetingDecision",
        label: "Board meeting decision",
        type: "file",
        accept: ".pdf,.jpg,.jpeg,.png",
        width: "w-full", // Full width for file inputs
      },
      {
        name: "annualMeetingAttendance",
        label: "Annual meeting attendance",
        type: "file",
        accept: ".pdf,.jpg,.jpeg,.png",
        width: "w-full", // Full width for file inputs
      },
      {
        name: "annualMeetingDecision",
        label: "Annual meeting decision",
        type: "file",
        accept: ".pdf,.jpg,.jpeg,.png",
        width: "w-full", // Full width for file inputs
      },
      {
        name: "electionRelatedDoc",
        label: "Election related documents",
        type: "file",
        accept: ".pdf,.jpg,.jpeg,.png",
        width: "w-full", // Full width for file inputs
      },
      {
        name: "otherDoc",
        label: "Other documents",
        type: "file",
        accept: ".pdf,.jpg,.jpeg,.png",
        width: "w-full", // Full width for file inputs
      },
      {
        name: "remarks",
        label: "Remarks",
        type: "textarea",
        placeholder: "Enter any additional remarks",
        rows: 4,
        width: "w-full", // Full width for textarea
      },
    ],
  },
];

export const FILE_CONSTRAINTS = {
  maxSize: 5 * 1024 * 1024,
  allowedTypes: [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/csv",
  ],
};

export const VALIDATION_RULES = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[0-9]{10}$/,
};

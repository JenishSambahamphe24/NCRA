import { z } from "zod";

export const BasicInfoSchema = z.object({
  id: z.number().optional(),
  cooperativeCode: z.string().min(1, "Cooperative code is required"),
  coopsFullNameNep: z.string().min(1, "Full name in Nepali is required"),
  coopsFullNameEng: z.string().min(1, "Full name in English is required"),
  registerDate: z.string().min(1, "Register date is required"),
  registerYear: z.string().min(1, "Register year is required"),
  fiscalYearId: z.number().min(1, "Fiscal year is required"),
  registeredFiscalYear: z.string().min(1, "Registered fiscal year is required"),
  contactMobilePhone: z.string().min(10, "Valid contact mobile is required"),
  contactOfficePhone: z.string().optional(),
  webUrl: z.string().url().optional().or(z.literal("")),
  contactPerson: z.string().min(1, "Contact person is required"),
  contactPhone: z.string().min(1, "Contact phone is required"),
  contactEmail: z.string().email("Valid email is required"),
  panNo: z.string().min(1, "PAN number is required"),
  registrationNo: z.string().min(1, "Registration number is required"),
  classificationOfCooperative: z.string().min(1, "Classification is required"),
  workingArea: z.string().min(1, "Working area is required"),
  anyBranchOffice: z.boolean().optional(),
  numberOfBranch: z.number().optional(),
  folderName: z.string().optional(),
  registeredFederation: z.boolean().optional(),
  registeredFederationName: z.string().optional(),
  registeredDateNep: z.string().optional(),
  coopsLogo: z.string().nullable().optional(),
  dscu: z.boolean().optional(),
  dcu: z.boolean().optional(),
  pscu: z.boolean().optional(),
  pcu: z.boolean().optional(),
  cscu: z.boolean().optional(),
  ncf: z.boolean().optional()
});

export const AddressInfoSchema = z.object({
  id: z.number().optional(),
  province: z.string().min(1, "Province is required"),
  district: z.string().min(1, "District is required"),
  localLevel: z.string().min(1, "Local level is required"),
  wardNo: z.number().min(1, "Ward number is required"),
  houseNo: z.string().optional(),
  tole: z.string().optional(),
});

export const FinancialInfoSchema = z.object({
  id: z.number().optional(),
  totalShareAmount: z.number().min(0, "Total share amount is required"),
  numberOfTotalShare: z.number().min(1, "Total number of shares is required"),
  noOfTotalMaleMember: z.number().min(0, "Number of male members is required"),
  noOfTotalFemaleMember: z
    .number()
    .min(0, "Number of female members is required"),
  totalSavingAmount: z.number().optional(),
  totalLiabilities: z.number().optional(),
  loanInOperation: z.number().optional(),
  totalAmountOfInstitutionalAssets: z.number().optional(),
});

export const CommitteeMemberSchema = z.object({
  id: z.number().optional(),
  committeeFormulationAssembly: z.string().min(1, "Committee type is required"),
  position: z.string().min(1, "Position is required"),
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  gender: z.string().min(1, "Gender is required"),
  email: z.string().email(),
  phoneNumber: z.string().min(1, "Phone number is required"),
  province: z.string().min(1, "Province is required"),
  district: z.string().min(1, "District is required"),
  localLevel: z.string().min(1, "Local level is required"),
  wardNo: z.number().min(1, "Ward number is required"),
  houseNumber: z.string().optional(),
  tole: z.string().optional(),
  panCard: z.instanceof(File).optional(),
  nidCard: z.instanceof(File).optional(),
});

export const ExecutiveMemberSchema = z.object({
  id: z.number().optional(),
  executiveMemberType: z.string().min(1, "Executive member type is required"),
  committeeFormulationAssembly: z
    .string()
    .min(1, "Committee formulation assembly is required"),
  position: z.string().min(1, "Position is required"),
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  gender: z.string().min(1, "Gender is required"),
  email: z.string().email(),
  phoneNumber: z.string().min(1, "Phone number is required"),
  dateOfAppointment: z.string().min(1, "Date of appointment is required"),
  termEnd: z.string().min(1, "Term end date is required"),
});

export const DocumentUploadSchema = z.object({
  id: z.number().optional(),
  files: z.instanceof(File).array().optional(),
});

export const CooperativeSchema = z.object({
  basic: BasicInfoSchema,
  address: AddressInfoSchema,
  financial: FinancialInfoSchema,
  committee: CommitteeMemberSchema.array(),
  executive: ExecutiveMemberSchema.array(),
  documents: DocumentUploadSchema,
  officialDocuments: DocumentUploadSchema,
});

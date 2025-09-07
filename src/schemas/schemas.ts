import * as yup from "yup";
import {
  phoneValidation,
  ageValidation,
  nameValidation,
  dateOfBirthValidation,
  dateExpireDate,
  mobileValidation,
  aadharValidation,
  emailValidation,
} from "../lib/commonValidations";

export const employeePersonalInformationSchema = yup.object({
  firstName: nameValidation,
  middleName: yup.string().optional(),
  lastName: nameValidation,
  gender: yup.string().required("Gender is required"),
  originalDob: dateOfBirthValidation,
  dob: dateOfBirthValidation,
  bloodGroup: yup.string().required("Blood Group is required"),
  weight: yup
    .number()
    .typeError("Weight must be a number")
    .positive("Weight must be positive")
    .required("Weight is required"),
  height: yup
    .number()
    .typeError("Height must be a number")
    .positive("Height must be positive")
    .required("Height is required"),
  physicallyChallenged: yup.string().required("This field is required"),
});
export const createChildSchema = (isRequired: boolean = false) => yup.object({
    relationship: isRequired ? yup.string().required("Relationship is required"): yup.string().optional(),
    name: isRequired ? nameValidation: yup.string().optional(),
    age: isRequired 
        ? yup.number()
            .typeError("Age must be a number")
            .positive("Age must be positive")
            .required("Age is required")
        : yup.number()
            .typeError("Age must be a number")
            .positive("Age must be positive")
            .optional(),
    mobile: yup.string().optional().matches(/^[6-9]\d{9}$/, 'Enter valid 10-digit mobile number'),
});

// Default child schema (optional)
export const childSchema = createChildSchema(false);

const familyBackgroundSchema = yup.object({
    maritalStatus: yup.string().required("Marital Status is required"),
    religion: yup.string().required("Religion is required"),
    nationality: yup.string().required("Nationality is required"),
    weddingDate: yup.string().when("maritalStatus", (maritalStatus: any, schema) => {
        return maritalStatus === "married"
            ? schema.required("Wedding Date is required")
            : schema.notRequired();
    }),
    spousesName: yup.string().when("maritalStatus", (maritalStatus: any, schema) => {
        return maritalStatus === "Married"
            ? schema.required("Spouse's Name is required")
            : schema.notRequired();
    }),
    spousesAge: yup.number().when("maritalStatus", (maritalStatus: any, schema) => {
        return maritalStatus === "Married"
            ? schema.typeError("Spouse's Age must be a number").required("Spouse's Age is required")
            : schema.notRequired();
    }),
    spousesOccupation: yup.string().when("maritalStatus", (maritalStatus: any, schema) => {
        return maritalStatus === "Married"
            ? schema.required("Spouse's Occupation is required")
            : schema.notRequired();
    }),
    spousesMobile: yup.string().when("maritalStatus", (maritalStatus: any, schema) => {
        return maritalStatus === "Married"
            ? schema.required("Spouse's Mobile Number is required")
            : schema.notRequired();
    }),
});

export { familyBackgroundSchema };

export const employeeFamilyDetailsSchema = yup.object({
    fathersName: yup.string().required("Father's Name is required"),
    fathersAge: yup
        .number()
        .typeError("Father's Age must be a number")
        .positive("Father's Age must be positive")
        .required("Father's Age is required"),
    fathersMobile: yup
        .string()
        .matches(/^[0-9]{10}$/, "Enter a valid 10-digit phone number")
        .required("Father's Mobile Number is required"),
    fathersOccupation: yup.string().required("Father's Occupation is required"),
    mothersName: yup.string().required("Mother's Name is required"),
    mothersAge: yup
        .number()
        .typeError("Mother's Age must be a number")
        .positive("Mother's Age must be positive")
        .required("Mother's Age is required"),
    mothersMobile: yup
        .string()
        .matches(/^[0-9]{10}$/, "Enter a valid 10-digit phone number")
        .required("Mother's Mobile Number is required"),
    mothersOccupation: yup.string().required("Mother's Occupation is required"),
});

export const employeeProfessionalDetailsSchema = yup.object({
  relationship: yup.string().required("Relationship is required"),
  name: nameValidation,
  age: yup
    .number()
    .typeError("Age must be a number")
    .positive("Age must be positive")
    .required("Age is required"),
  mobile: yup
    .string()
    .optional()
    .matches(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile number"),
});

export const contactDetailsSchema = yup.object({
  emergencyContactNumber: phoneValidation,

  mobileNumber: mobileValidation,

  alternateMobileNumber: yup
    .string()
    .nullable()
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit phone number")
    .notRequired(),

  email: emailValidation,

  country: yup.string().required("Country is required"),

  state: yup.string().required("State is required"),

  city: yup.string().required("City is required"),

  pincode: yup
    .string()
    .required("Pincode is required")
    .matches(/^[0-9]{6}$/, "Pincode must be 6 digits"),

  currentAddress: yup.string().required("Current Address is required"),

  permanentAddress: yup.string().required("Permanent Address is required"),

  driversLicense: yup.string().nullable().notRequired(),

  driversLicenceIssueDate: yup
    .string()
    .nullable()
    .notRequired()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Enter date in YYYY-MM-DD format"),

  driversLicenseEXPDate: yup
    .string()
    .nullable()
    .notRequired()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Enter date in YYYY-MM-DD format")
    .test(
      "is-after-issue-date",
      "Expiry date must be after issue date",
      function (value) {
        const { driversLicenceIssueDate } = this.parent;
        if (!value || !driversLicenceIssueDate) return true;
        return new Date(value) > new Date(driversLicenceIssueDate);
      }
    ),
});

export const insuranceFinancialDetailsSchema = yup.object({
  panCardNo: yup
    .string()
    .required("Pan Card No is required")
    .matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, "Invalid PAN format"),

  aadharCardNo: aadharValidation,

  insurance: yup.string().required("Insurance selection is required"),

  familyInsurance: yup
    .string()
    .required("Family Insurance selection is required"),

  insuranceCompanyName: yup
    .string()
    .required("Insurance Company Name is required"),

  insuranceExpirDate: dateExpireDate,

  familyInsuranceCompanyName: yup
    .string()
    .required("Family Insurance Company Name is required"),

  familyInsuranceExpiry: dateExpireDate,

  pfNumber: yup.string().optional(), // optional field
});

export const qualificationLegalDetailsSchema = yup.object({
  hasPassport: yup.string().required("Please select if you have a passport"),

  passportNumber: yup.string().when("hasPassport", {
    is: (value) => value === "yes", // or "true", depending on your binaryOptions
    then: (schema) =>
      schema
        .required("Passport Number is required")
        .matches(/^[A-Z0-9]{6,9}$/, "Enter a valid passport number"),
    otherwise: (schema) => schema.notRequired().nullable(),
  }),

  visaType: yup.string().required("Please select a visa type"),

  native: yup.string().required("Native place is required"),

  readyToRelocate: yup.string().required("Please select if ready to relocate"),

  healthConditions: yup.string().required("Health conditions are required"),

  surgeryUndergone: yup
    .string()
    .required("Please select surgery undergone or not"),
});

export const educationDetailsSchema = yup.object({
  qualification: yup.string().required("Qualification is required"),

  institutionName: yup.string().required("Institution Name is required"),

  percentage: yup
    .number()
    .typeError("Percentage must be a number")
    .min(0, "Percentage cannot be less than 0")
    .max(100, "Percentage cannot be more than 100")
    .required("Percentage is required"),

    yearOfPassing: yup.string()
        .required("Year of Passing is required"),
});

export const jobExperienceDetailsSchema = yup.object({
  companyName: yup.string().required("Company Name is required"),

  experienceFromDate: yup
    .string()
    .required("Experience From Date is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),

  experienceToDate: yup
    .string()
    .required("Experience To Date is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
    .test(
      "is-after-from-date",
      "To Date must be after From Date",
      function (value) {
        const { experienceFromDate } = this.parent;
        if (!value || !experienceFromDate) return true; // skip if empty, handled by required
        return new Date(value) >= new Date(experienceFromDate);
      }
    ),

  experienceMonths: yup.string().optional(),

  isInsideCompany: yup.boolean().optional(),
});

export const employmentDetailsSchema = yup.object({
    postAppliedFor: yup.string().optional(),
    employeeAccountNo: yup.string().optional(),
    proposedJoinDate: yup.string()
        .optional()
        .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
    joiningDate: yup.string()
        .optional()
        .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
});


const maxSize = 5 * 1024 * 1024; // 5MB

const isValidFile = (file: any) => {
  const actualFile = file?.originFileObj || file;
  return actualFile instanceof File;
};

export const uploadFormSchema = yup.object().shape({
  aadhaar: yup
    .mixed()
    .required('Aadhaar is required')
    .test('fileSize', 'File too large', (file) => {
      const actualFile = file?.originFileObj || file;
      return !file || actualFile.size <= maxSize;
    })
    .test('fileType', 'Only PDF allowed', (file) => {
      const actualFile = file?.originFileObj || file;
      return !file || actualFile.type === 'application/pdf';
    }),

  pan: yup
    .mixed()
    .required('PAN Card is required')
    .test('fileSize', 'File too large', (file) => {
      const actualFile = file?.originFileObj || file;
      return !file || actualFile.size <= maxSize;
    })
    .test('fileType', 'Only PDF allowed', (file) => {
      const actualFile = file?.originFileObj || file;
      return !file || actualFile.type === 'application/pdf';
    }),

  degree: yup
    .mixed()
    .required('Degree is required')
    .test('fileSize', 'File too large', (file) => {
      const actualFile = file?.originFileObj || file;
      return !file || actualFile.size <= maxSize;
    })
    .test('fileType', 'Only PDF allowed', (file) => {
      const actualFile = file?.originFileObj || file;
      return !file || actualFile.type === 'application/pdf';
    }),

  drivingLicence: yup
    .mixed()
    .required('Driving Licence is required')
    .test('fileSize', 'File too large', (file) => {
      const actualFile = file?.originFileObj || file;
      return !file || actualFile.size <= maxSize;
    })
    .test('fileType', 'Only PDF allowed', (file) => {
      const actualFile = file?.originFileObj || file;
      return !file || actualFile.type === 'application/pdf';
    }),

  profileImage: yup
    .mixed()
    .required('Profile Image is required')
    .test('fileSize', 'File too large', (file) => {
      const actualFile = file?.originFileObj || file;
      return !file || actualFile.size <= maxSize;
    })
    .test('fileType', 'Only PNG or JPG allowed', (file) => {
      const actualFile = file?.originFileObj || file;
      return !file || ['image/jpeg', 'image/png'].includes(actualFile.type);
    }),
});

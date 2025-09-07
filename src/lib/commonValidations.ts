import * as yup from "yup";
import { checkCandidateExistence } from "../service/apiService";

const candidate_id = "UR-CAN-210";
// const candidate_id = "";

const EXISTENCE_MEMO = {
  mobile: new Map<string, string>(), // key: candidateId, value: last mobile checked
  email: new Map<string, string>(), // key: candidateId, value: last email checked
  aadhar: new Map<string, string>(), // key: candidateId, value: last aadhar checked
};

const shouldSkipExistenceCheck = (
  current: string | undefined | null,
  initial: string | undefined | null,
  lastChecked: string | undefined | null
) => {
  if (!current) return true; // nothing to check
  if (current === initial) return true; // unchanged from initial (server/original)
  if (current === lastChecked) return true; // unchanged since last API call
  return false;
};

export const nameValidation = yup
    .string()
    .required("This field is required")
    .min(2, "Must be at least 2 characters")
    .max(30, "Must be less than 30 characters");

export const ageValidation = yup
  .number()
  .typeError("Age must be a number")
  .positive("Age must be positive")
  .required("This field is required")
  .max(120, "The age must be less than 120");

export const dateValidation = yup
  .string()
  .required("This field is required")
  .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format");

export const phoneValidation = yup
  .string()
  .required("This field is required")
  .matches(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile number");

export const dateOfBirthValidation = yup
  .string()
  .required("This field is required")
  .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
  .test("Date of Birth cannot be in the future", (value) => {
    if (!value) return false;
    const today = new Date();
    const inputDate = new Date(value);
    return inputDate <= today;
  });

export const dateExpireDate = dateValidation.test(
  "date-not-in-past",
  "Expiry date cannot be in the past",
  (value) => {
    if (!value) return false;
    const today = new Date();
    const expiry = new Date(value);
    return expiry >= today;
  }
);

export const mobileValidation = yup
  .string()
  .required("This field is required.")
  .test("not-only-country-code", "This field is required.", (v) => {
    if (v == null) return false;
    const s = String(v).trim();
    return s !== "+91" && s !== "91";
  })
  .matches(/^(?:\+91|91)?[0-9]{10}$/, "Mobile number must be 10 digits long")
  .test(
    "mobile-exists",
    "Mobile number already exists",
    async function (value) {
      const ctx = (this as any)?.options?.context || {};
      const initialVal = ctx?.initial?.contact_details?.mobile_number ?? null;
      const idKey = (candidate_id ?? "new") as string;
      const lastChecked = EXISTENCE_MEMO.mobile.get(idKey) ?? null;

      if (shouldSkipExistenceCheck(value, initialVal, lastChecked)) {
        return true; // skip API
      }

      try {
        await checkCandidateExistence({
          mobile_number: value!,
          candidate_id: candidate_id ?? "",
        });
        EXISTENCE_MEMO.mobile.set(idKey, value!);
        return true;
      } catch {
        return this.createError({ message: "Mobile number already exists" });
      }
    }
  );

export const emailValidation = yup
  .string()
  .required("This field is required.")
  .max(250, "Must be less than 250 characters")
  .matches(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
    "Enter a valid email address"
  )
  .test("email-exists", "Email already exists", async function (value) {
    if (!value) return true;

    const ctx = (this as any)?.options?.context || {};
    const initialVal = ctx?.initial?.contact_details?.email ?? null;
    const idKey = (candidate_id ?? "new") as string;
    const lastChecked = EXISTENCE_MEMO.email.get(idKey) ?? null;

    if (shouldSkipExistenceCheck(value, initialVal, lastChecked)) {
      return true; // skip API
    }

    try {
      await checkCandidateExistence({
        email: value!,
        candidate_id: candidate_id ?? "",
      });
      EXISTENCE_MEMO.email.set(idKey, value!);
      return true;
    } catch {
      return this.createError({ message: "Email already exists" });
    }
  });

export const aadharValidation = yup
  .string()
  .required("This field is required.")
  .matches(/^\d{12}$/, "Enter valid 12-digit Aadhar number")
  .test(
    "aadhar-exists",
    "Aadhar number already exists",
    async function (value) {
      if (!value) return true;

      const ctx = (this as any)?.options?.context || {};
      const initialVal =
        ctx?.initial?.insurance_financial_details?.aadhar_number ?? null;
      const idKey = (candidate_id ?? "new") as string;
      const lastChecked = EXISTENCE_MEMO.aadhar.get(idKey) ?? null;

      if (shouldSkipExistenceCheck(value, initialVal, lastChecked)) {
        return true; // skip API
      }

      try {
        await checkCandidateExistence({
          aadhar_number: value!,
          candidate_id: candidate_id ?? "",
        });
        EXISTENCE_MEMO.aadhar.set(idKey, value!);
        return true;
      } catch {
        return this.createError({ message: "Aadhar number already exists" });
      }
    }
  );

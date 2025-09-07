import { binaryOptions, genderOptions, religionOptions, nationalityOptions, maritalOptions, bloodGroupOptions, postAppliedForOptions, visaTypeOptions } from '../lib/constants'

export const steppers = [
    {
        stepName: "Employee Personal Information",
        fields: [
            { name: "firstName", label: "First Name", type: "text", placeholder: "Enter First Name", required: true },
            { name: "middleName", label: "Middle Name", type: "text", placeholder: "Enter Middle Name" },
            { name: "lastName", label: "Last Name", type: "text", placeholder: "Enter Last Name", required: true },
            { name: "gender", label: "Gender", type: "select", options: genderOptions, required: true },
            { name: "originalDob", label: "Original DOB", type: "date", placeholder: "Select Original DOB", required: true },
            { name: "dob", label: "DOB", type: "date", placeholder: "Select DOB", required: true },
            { name: "bloodGroup", label: "Blood Group", type: "select", placeholder: "Enter Blood Group", options: bloodGroupOptions, required: true },
            { name: "weight", label: "Weight (kg)", type: "number", placeholder: "Enter Weight (kg)", required: true },
            { name: "height", label: "Height (cm)", type: "number", placeholder: "Enter Height (cm)", required: true },
            { name: "physicallyChallenged", label: "Physically Challenged", type: "select", options: binaryOptions, required: true },
        ],
    },
    {
        stepName: "Employee Family & Background",
        fields: [
            { name: "maritalStatus", label: "Marital Status", type: "select", options: maritalOptions, required: true },
            { name: "religion", label: "Religion", type: "select", options: religionOptions, required: true },
            { name: "nationality", label: "Nationality", type: "select", placeholder: "Enter Nationality", options: nationalityOptions, required: true },
            { name: "weddingDate", label: "Wedding Date", type: "date", placeholder: "Select Wedding Date", required: false },
            { name: "spousesName", label: "Spouse's Name", type: "text", placeholder: "Enter Spouse's Name", required: false },
            { name: "spousesAge", label: "Spouse's Age", type: "number", placeholder: "Enter Spouse's Age", required: false },
            { name: "spousesOccupation", label: "Spouse's Occupation", type: "text", placeholder: "Enter Spouse's Occupation", required: false },
            { name: "spousesMobile", label: "Spouse's Mobile Number", type: "tel", placeholder: "Enter Spouse's Mobile Number", required: false },
        ],
    },
    {
        stepName: "Employee Family Details",
        fields: [
            { name: "fathersName", label: "Father's Name", type: "text", placeholder: "Enter Father's Name", required: true },
            { name: "fathersAge", label: "Father's Age", type: "number", placeholder: "Enter Father's Age", required: true },
            { name: "fathersMobile", label: "Father's Mobile Number", type: "tel", placeholder: "Enter Father's Mobile Number", required: true },
            { name: "fathersOccupation", label: "Father's Occupation", type: "text", placeholder: "Enter Father's Occupation", required: true },
            { name: "mothersName", label: "Mother's Name", type: "text", placeholder: "Enter Mother's Name", required: true },
            { name: "mothersAge", label: "Mother's Age", type: "number", placeholder: "Enter Mother's Age", required: true },
            { name: "mothersMobile", label: "Mother's Mobile Number", type: "tel", placeholder: "Enter Mother's Mobile Number", required: true },
            { name: "mothersOccupation", label: "Mother's Occupation", type: "text", placeholder: "Enter Mother's Occupation", required: true },
        ],
    },
    {
        stepName: "Employment Details",
        fields: [
            { name: "postAppliedFor", label: "Post Applied For", type: "select", placeholder: "Select Post Applied For", options: postAppliedForOptions },
            { name: "employeeAccountNo", label: "Employee Account No", type: "number", placeholder: "Enter Bank Account Number" },
            { name: "proposedJoinDate", label: "Proposed Join Date", type: "date", placeholder: "Select Proposed Join Date" },
            { name: "joiningDate", label: "Joining Date", type: "date", placeholder: "Select Joining Date" },
        ],
    },
    {
        stepName: "Contact Details",
        fields: [
            { name: "emergencyContactNumber", label: "Emergency Contact Number", type: "tel", placeholder: "Enter Emergency Contact Number", required: true },
            { name: "mobileNumber", label: "Mobile Number", type: "tel", placeholder: "Enter Mobile Number", required: true },
            { name: "alternateMobileNumber", label: "Alternate Mobile Number", type: "tel", placeholder: "Enter Alternate Mobile Number" },
            { name: "email", label: "Email", type: "email", placeholder: "Enter Email", required: true },
            { name: "country-state-city", label: "Location", type: "country-state-city", required: true },
            { name: "pincode", label: "Pincode", type: "text", placeholder: "Enter Pincode", required: true },
            { name: "currentAddress", label: "Current Address", type: "text", placeholder: "Enter Current Address", required: true },
            { name: "permanentAddress", label: "Permanent Address", type: "text", placeholder: "Enter Permanent Address", required: true },
            { name: "driversLicense", label: "Drivers License", type: "text", placeholder: "Enter Drivers License number" },
            { name: "driversLicenceIssueDate", label: "Drivers Licence Issue Date", type: "date", placeholder: "Select Drivers Licence Issue Date" },
            { name: "driversLicenseEXPDate", label: "Drivers License EXP Date", type: "date", placeholder: "Select Drivers License EXP Date" },
        ],
    },
    {
        stepName: "Insurance & Financial Details",
        fields: [
            { name: "panCardNo", label: "Pan Card No", type: "text", placeholder: "Enter Pan Card No", required: true },
            { name: "aadharCardNo", label: "Aadhar Card No", type: "text", placeholder: "Enter Aadhar Card No", required: true },
            { name: "insurance", label: "Insurance", type: "select", placeholder: "Select Insurance", required: true, options: binaryOptions },
            { name: "familyInsurance", label: "Family Insurance", type: "select", placeholder: "Select Family Insurance", required: true, options: binaryOptions },
            { name: "insuranceCompanyName", label: "Insurance Company Name", type: "text", placeholder: "Enter Insurance Company Name", required: true },
            { name: "insuranceExpirDate", label: "Insurance Expiry Date", type: "date", placeholder: "Select Insurance Expiry Date", required: true },
            { name: "familyInsuranceCompanyName", label: "Family Insurance Company Name", type: "text", placeholder: "Enter Family Insurance Company Name", required: true },
            { name: "familyInsuranceExpiry", label: "Family Insurance Expiry", type: "date", placeholder: "Enter Family Insurance Expiry", required: true },
            { name: "pfNumber", label: "PF Number", type: "text", placeholder: "Enter PF Number" },
        ],
    },
    {
        stepName: "Qualification & Legal Details",
        fields: [
            { name: "hasPassport", label: "Has Passport", type: "select", placeholder: "Select Yes or No", required: true, options: binaryOptions },
            { name: "passportNumber", label: "Passport Number", type: "text", placeholder: "Enter Passport Number", required: true },
            { name: "visaType", label: "Visa Type", type: "select", placeholder: "Select Visa Type", required: true, options: visaTypeOptions },
            { name: "native", label: "Native", type: "text", placeholder: "Enter Native", required: true },
            { name: "readyToRelocate", label: "Ready to Relocate", type: "select", placeholder: "Select Yes or No", required: true, options: binaryOptions },
            { name: "healthConditions", label: "Health Conditions", type: "text", placeholder: "Enter Health Conditions", required: true },
            { name: "surgeryUndergone", label: "Surgery Undergone", type: "select", placeholder: "Select Surgery Undergone", options: binaryOptions, required: true },
        ],
    },
    {
        stepName: "Education Details",
        fields: [
            { name: "qualification", label: "Qualification", type: "text", placeholder: "e.g., SSLC, HSC, B.E.", required: true },
            { name: "institutionName", label: "Institution Name", type: "text", placeholder: "e.g., XYZ University", required: true },
            { name: "percentage", label: "Percentage", type: "number", placeholder: "Enter Percentage", required: true },
            { name: "yearOfPassing", label: "Year of Passing", type: "year", placeholder: "Select the Year of Passing", required: true },
        ],
    },
    {
        stepName: "Job Experience Details",
        fields: [
            { name: "companyName", label: "Company Name", type: "text", placeholder: "Enter Company Name", required: true },
            { name: "experienceFromDate", label: "Experience From Date", type: "date", placeholder: "Select date", required: true },
            { name: "experienceToDate", label: "Experience To Date", type: "date", placeholder: "Select previous Exp to date", required: true },
            { name: "experienceMonths", label: "Experience (Months)", type: "text", placeholder: "Auto-calculated", required: false, readOnly: true },
            { name: "isInsideCompany", label: "Is Inside Company", type: "checkbox", required: false },
            { name: "name", label: "Name", type: "text", placeholder: "Name", required: true },
            { name: "designation", label: "Designation", type: "text", placeholder: "Enter Designation", required: true },
            { name: "contactNumber", label: "Contact Number", type: "tel", placeholder: "Enter Contact Number", required: true },
            { name: "referenceEmail", label: "Email", type: "email", placeholder: "Enter Email", required: true },
        ],
    },
    {
        stepName: "Attachments",
        fields: [
            { name: "aadhaarFile", label: "Upload Aadhaar", type: "file", accept: ".pdf", note: "PDF up to 5MB.", required: true },
            { name: "panCardFile", label: "Upload PAN Card", type: "file", accept: ".pdf", note: "PDF up to 5MB." },
            { name: "degreeFile", label: "Upload Degree", type: "file", accept: ".pdf", note: "PDF up to 5MB." },
            { name: "drivingLicenseFile", label: "Upload Driving Licence", type: "file", accept: ".pdf", note: "PDF up to 5MB." },
            { name: "profileImage", label: "Profile image", type: "file", accept: ".png,.jpg,.jpeg", note: "PNG/JPG up to 5MB." },
        ],
    }
]
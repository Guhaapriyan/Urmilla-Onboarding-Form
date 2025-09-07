import React, { useState, useEffect } from "react";
import { useForm, FormProvider, FieldPath, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Steps } from "antd";
import { steppers } from "../config/stepper";
import FormInput, { MobileNumberInput } from "../components/Form/FormInput";
import InlineEducationForm from "../components/InlineEducationForm";
import FormDropdown from "../components/Form/DropDown";
import FormDatePicker from "../components/Form/DatePicker";
import { CountryStateCity } from "../components/Form/CountryStateCity";
import FormToggle from "../components/Form/FormToggle";
import * as yup from "yup";
import { 
  employeePersonalInformationSchema,
  familyBackgroundSchema,
  employeeFamilyDetailsSchema,
  contactDetailsSchema,
  insuranceFinancialDetailsSchema,
  qualificationLegalDetailsSchema,
  educationDetailsSchema,
  jobExperienceDetailsSchema,
  employmentDetailsSchema,
  createChildSchema
} from "../schemas/schemas";
import { Stepper } from "../components/UI/stepper";
import { InlineChildrenForm } from "../components/InlineChildrenForm";
import { 
  saveFormDataToCookie, 
  loadFormDataFromCookie, 
  saveCurrentStepToCookie, 
  loadCurrentStepFromCookie,
  clearCurrentStepData,
  clearFormCookies
} from "../lib/cookieUtils";
import FileUploadField from "../components/Form/FileUpload";
import { PlusOutlined } from "@ant-design/icons";
import { JobExperienceForm } from "../components/JobExperienceForm";
import { JobReferenceForm } from "../components/JobReferenceFrom";

const createCombinedSchema = (isChildrenFormVisible: boolean = false) => {
  const baseSchema = employeePersonalInformationSchema
    .concat(familyBackgroundSchema)
    .concat(employeeFamilyDetailsSchema)
    .concat(contactDetailsSchema)
    .concat(insuranceFinancialDetailsSchema)
    .concat(qualificationLegalDetailsSchema)
    .concat(educationDetailsSchema)
    .concat(jobExperienceDetailsSchema)
    .concat(employmentDetailsSchema);

  if (isChildrenFormVisible) {
    return baseSchema.shape({
      children: yup.array().of(createChildSchema(true)).optional()
    });
  }
  return baseSchema.shape({
    children: yup.array().of(createChildSchema(false)).optional()
  });
};

export default function StepperForm() {
  const initialFormData = loadFormDataFromCookie();
  const initialStep = loadCurrentStepFromCookie();

  const [countryValue, setCountryValue] = useState(initialFormData?.country || "");
  const [stateValue, setStateValue] = useState(initialFormData?.state || "");
  const [cityValue, setCityValue] = useState(initialFormData?.city || "");
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [children, setChildren] = useState<any[]>(initialFormData?.children || []);
  const [isChildrenFormVisible, setIsChildrenFormVisible] = useState(false);
  const [experiences, setExperiences] = useState<any[]>(initialFormData?.experiences || []);
  const [isExperienceFormVisible, setIsExperienceFormVisible] = useState(false);

  const [references, setReferences] = useState<any[]>(initialFormData?.references || []);
  const [isReferenceFormVisible, setIsReferenceFormVisible] = useState(false);

  const methods = useForm({
    resolver: yupResolver(createCombinedSchema(isChildrenFormVisible)),
    defaultValues: initialFormData,
    mode: "onChange",
  });

  const steps = steppers.map((step, index) => ({
    id: index + 1,
    title: step.stepName,
  }));

  useEffect(() => {
    const savedData = loadFormDataFromCookie();
    const completed = new Set<number>();
    
    steppers.forEach((step, index) => {
      const stepFields = step?.fields?.map(field => field.name);
      const hasStepData = stepFields?.some(fieldName => savedData[fieldName] !== undefined);
      if (hasStepData) {
        completed.add(index);
      }
    });
    setCompletedSteps(completed);
  }, []);

  useEffect(() => {
    saveCurrentStepToCookie(currentStep);
  }, [currentStep]);

  useEffect(() => {
    const subscription = methods.watch((formData) => {
      saveFormDataToCookie(formData);
    });
    
    return () => subscription.unsubscribe();
  }, [methods]);

  useEffect(() => {
    const savedData = loadFormDataFromCookie();
    if (savedData && Object.keys(savedData).length > 0) {
      const currentFormData = methods.getValues();
      const hasData = Object.values(currentFormData).some(value => 
        value !== undefined && value !== null && value !== ""
      );
      
      if (!hasData || JSON.stringify(currentFormData) !== JSON.stringify(savedData)) {
        methods.reset(savedData);
        setCountryValue(savedData.country || "");
        setStateValue(savedData.state || "");
        setCityValue(savedData.city || "");
      }
    }
  }, [currentStep, methods]);

  useEffect(() => {
    const formData = methods.getValues();
    if (formData.country !== countryValue) {
      setCountryValue(formData.country || "");
    }
    if (formData.state !== stateValue) {
      setStateValue(formData.state || "");
    }
    if (formData.city !== cityValue) {
      setCityValue(formData.city || "");
    }
  }, [currentStep, methods, countryValue, stateValue, cityValue]);
  useEffect(() => {
    const newSchema = createCombinedSchema(isChildrenFormVisible);
    methods.clearErrors();
  }, [isChildrenFormVisible, methods]);

  const nextStep = async () => {
    const currentStepFields = steppers[currentStep]?.fields?.map(field => field.name);
    let fieldsToValidate = [...currentStepFields];
    if (currentStep === 1 && isChildrenFormVisible && maritalStatus !== "single") {
      fieldsToValidate.push('children');
    }

    // Education Details step: validate dynamic list as well
    const educationStepIndex = steppers.findIndex(s => s.stepName === "Education Details");
    if (currentStep === educationStepIndex) {
      fieldsToValidate.push('educationList');
    }
    
    if (currentStep === 5) {
      fieldsToValidate = fieldsToValidate.filter(field => field !== 'country-state-city');
      fieldsToValidate.push('country', 'state', 'city');
    }
    
    const isValid = await methods.trigger(fieldsToValidate);
    if (isValid && currentStep < steps.length - 1) {
      const currentFormData = methods.getValues();
      saveFormDataToCookie(currentFormData);
      
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      
      setCurrentStep(currentStep + 1);
    } else if (!isValid) {
      const firstErrorField = document.querySelector('.border-red-500');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    
    // Get all cookie data and filter out upload fields
    const cookieData = loadFormDataFromCookie();
    const filteredData = { ...cookieData };
    
    // Remove upload-related fields
    const uploadFields = ['aadhaar', 'pan', 'degree', 'drivingLicence', 'profileImage'];
    uploadFields.forEach(field => {
      delete filteredData[field];
    });
    
    console.log("All Cookie Values (excluding upload data):", filteredData);
    clearFormCookies();
  };

  const handleChildrenChange = (newChildren: any[]) => {
    setChildren(newChildren);
    methods.setValue("children", newChildren);
  };

  const handleAddChildrenClick = () => {
    setIsChildrenFormVisible(true);
  };

  const handleCloseChildrenForm = () => {
    setIsChildrenFormVisible(false);
  };

    const handleExperiencesChange = (newExperiences: any[]) => {
    setExperiences(newExperiences);
    methods.setValue("experiences", newExperiences);
  };

  const handleAddExperienceClick = () => {
    setIsExperienceFormVisible(true);
  };

  const handleCloseExperienceForm = () => {
    setIsExperienceFormVisible(false);
  };

  const handleReferencesChange = (newReferences: any[]) => {
    setReferences(newReferences);
    methods.setValue("references", newReferences);
  };

  const handleAddReferenceClick = () => {
    setIsReferenceFormVisible(true);
  };

  const handleCloseReferenceForm = () => {
    setIsReferenceFormVisible(false);
  };

    const { control, handleSubmit, trigger } = methods;
    const maritalStatus = useWatch({
        control,
        name: "maritalStatus",
    });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="py-8">
        {/* Stepper Header */}
        {/* Current Step Fields */}

        <Stepper steps={steps} currentStep={currentStep} className="px-5 lg:px-10"/>

        <div className="flex justify-center items-center mt-10 mb-3">
          <h2 className="text-2xl font-semibold text-[#313475] mb-6">
            {steppers[currentStep].stepName}
          </h2>
        </div>


        {/* Current Step Fields */}
        <div className="bg-gray-50 border border-gray-300 rounded-lg shadow-sm mx-5 lg:mx-20 p-6 dark:bg-black dark:border-gray-700">
          {
              currentStep === steppers.findIndex(s => s.stepName === "Job Experience Details") && (
                <h1 className="text-xl font-bold text-[#313475] mb-4">Work Experience</h1>
              )
          }
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
            {(steppers[currentStep]?.fields?.map((field) => {
                  // Disable permanentAddress input when sameAsCurrentAddress is checked
                  const sameAs = methods.watch("sameAsCurrentAddress");
                  if (
                    field.name.startsWith("spouses") &&
                    maritalStatus !== "married"
                  ) {
                    return null;
                  }
                  switch (field.type) {
                    case "text":
                    case "email":
                      const isCurrentAddr = field.name === 'currentAddress';
                      const labelNode = isCurrentAddr ? (
                        <div className="flex items-center justify-between">
                          <span>{field.label}</span>
                          <label className="flex items-center gap-2 text-sm font-normal">
                            <input
                              type="checkbox"
                              checked={!!sameAs}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                methods.setValue('sameAsCurrentAddress', checked);
                                if (checked) {
                                  const current = methods.getValues('currentAddress');
                                  methods.setValue('permanentAddress', current, { shouldValidate: true });
                                }
                              }}
                            />
                            <span>Save as Permanent</span>
                          </label>
                        </div>
                      ) : field.label;

                      return (
                        <FormInput<any>
                          key={field.name}
                          name={field.name}
                          control={methods.control}
                          type={field.type}
                          label={labelNode as any}
                          placeholder={field.placeholder}
                          required={field.required}
                          disabled={field.readOnly || (field.name === 'permanentAddress' && sameAs)}
                          maxLength={field.maxLength}
                          alphaOnly={field.alphaOnly}
                          multiline={field.multiline}
                          rows={field.rows}
                        />
                      );
                    case "number":
                      return (
                        <FormInput<any>
                          key={field.name}
                          name={field.name}
                          control={methods.control}
                          type={field.type}
                          label={field.label}
                          placeholder={field.placeholder}
                          required={field.required}
                          disabled={field.readOnly || (field.name === 'permanentAddress' && sameAs)}
                          maxLength={field.maxLength}
                        />
                      );
                    case "tel":
                      return (
                        <MobileNumberInput<any>
                          key={field.name}
                          name={field.name}
                          control={methods.control}
                          label={field.label}
                          placeholder={field.placeholder}
                          required={field.required}
                          disabled={field.readOnly}
                        />
                      );
                    case "select":
                      if (field.name === "country" || field.name === "state" || field.name === "city") {
                        return null;
                      }
                      return (
                        <FormDropdown<any>
                          key={field.name}
                          name={field.name}
                          control={methods.control}
                          label={field.label}
                          placeholder={field.placeholder}
                          options={field.options || []}
                          required={field.required}
                        />
                      );
                    case "country-state-city":
                      return (
                        <CountryStateCity
                          key="country-state-city"
                          control={methods.control}
                          countryValue={countryValue}
                          stateValue={stateValue}
                          cityValue={cityValue}
                          onCountryChange={setCountryValue}
                          onStateChange={setStateValue}
                          onCityChange={setCityValue}
                        />
                      );
                    case "checkbox":
                      // Skip rendering the standalone checkbox for sameAsCurrentAddress,
                      // since we render it inline with the Current Address label above
                      if (field.name === 'sameAsCurrentAddress') {
                        return null;
                      }
                      return (
                        <label key={field.name} className="flex items-center gap-2 text-sm sm:text-base">
                          <input type="checkbox" {...methods.register(field.name)} />
                          {field.label}
                        </label>
                      );
                    case "date":
                    case "year":
                      // Allow future dates for expiry date fields
                      const isExpiryDate = field.name.toLowerCase().includes('exp') || 
                        field.name.toLowerCase().includes('expiry') ||
                        field.name.toLowerCase().includes('expdate');
                      return (
                        <FormDatePicker<any>
                          key={field.name}
                          name={field.name}
                          control={methods.control}
                          label={field.label}
                          placeholder={field.placeholder}
                          variant={field.type === "year" ? "year" : "date"}
                          required={field.required}
                          disableFuture={!isExpiryDate}
                        />
                      );
                    case "file":
                      return (
                        <FileUploadField
                          key={field.name}
                          name={field.name}
                          label={field.label}
                          note={field.note}
                          control={methods.control}
                          accept={field.accept}
                          required={field.required}
                        />
                      );
                    case "toggle":
                      return (
                        <FormToggle<any>
                          name={field.name}
                          control={control}
                          label={field.label}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      );
                    default:
                      return null;
                  }
                })
              )
            }
          </div>
        </div>

        {/* Inline Children Form */}
        {maritalStatus !== "single" && currentStep === 1 && (
          <InlineChildrenForm
          control={control}
          children={children}
          onChildrenChange={handleChildrenChange}
            isVisible={isChildrenFormVisible}
            onClose={handleCloseChildrenForm}
          />
        )}
        
        {/* Inline Education Form - appears on Education Details step */}
        {currentStep === steppers.findIndex(s => s.stepName === "Education Details") && (
            <InlineEducationForm control={control} />
        )}

        {currentStep === steppers.findIndex(s => s.stepName === "Job Experience Details") && (
          <>
            <JobExperienceForm
              control={control}
              experiences={experiences}
              onExperiencesChange={handleExperiencesChange}
              isVisible={true}
              onClose={handleCloseExperienceForm}
            />
             {/* Render fields2 if present */}
            <div className="bg-gray-50 border border-gray-300 rounded-lg shadow-sm mx-5 lg:mx-20 p-6 dark:bg-black dark:border-gray-700 mt-4">
              {
              currentStep === steppers.findIndex(s => s.stepName === "Job Experience Details") && (
                <h1 className="text-xl font-bold text-[#313475] mb-4">Work Reference</h1>
              )
          }
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
            {(steppers[currentStep]?.fields2?.map((field) => {
              switch (field.type) {
                case "text":
                case "email":
                  return (
                    <FormInput<any>
                      key={field.name}
                      name={field.name}
                      control={methods.control}
                      type={field.type}
                      label={field.label}
                      placeholder={field.placeholder}
                      required={field.required}
                      maxLength={field.maxLength}
                      alphaOnly={field.alphaOnly}
                    />
                  );
                case "tel":
                  return (
                    <MobileNumberInput<any>
                      key={field.name}
                      name={field.name}
                      control={methods.control}
                      label={field.label}
                      placeholder={field.placeholder}
                      required={field.required}
                    />
                  );
                // Add other field types as needed
                default:
                  return null;
              }
            }))
            }
          </div>
        </div>
            <JobReferenceForm
              control={control}
              references={references}
              onReferencesChange={handleReferencesChange}
              isVisible={true}
              onClose={handleCloseReferenceForm}
            />
          </>
        )}

        {/* Step Navigation Buttons - Fixed at bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
          <div className="flex justify-between max-w-7xl mx-auto px-5 lg:px-20">
            <div className="flex-1">
              {currentStep > 0 && (
                <Button onClick={prevStep} className="mr-2">
                  <span className="mr-1">&lt;</span>
                  Previous
                </Button>
              )}
            </div>
            
            <div className="flex-1 flex justify-center">
              {maritalStatus !== "single" && currentStep === 1 && !isChildrenFormVisible && (
                <Button
                  type="primary"
                  size="large"
                  onClick={handleAddChildrenClick}
                >
                  + Add Children
                </Button>
              )}
            </div>
            
            <div className="flex-1 flex justify-end">
              {currentStep < steppers.length - 1 && (
                <Button type="primary" onClick={() => nextStep()} size="sm">
                  Next
                  <span className="ml-1">&gt;</span>
                </Button>
              )}
              {currentStep === steppers.length - 1 && (
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {/* Step Navigation Buttons */}
        <div className="flex justify-between mt-8 px-5 lg:px-20">
          {maritalStatus !== "single" && currentStep === 1 && !isChildrenFormVisible && (
            <Button
              type = "primary"
              size="large"
              onClick={handleAddChildrenClick}
            >
              + Add Children
            </Button>
          )}
        </div>
        
        {/* Add bottom padding to prevent content from being hidden behind fixed buttons */}
        <div className="h-20"></div>
      </form>
    </FormProvider>
  );
}

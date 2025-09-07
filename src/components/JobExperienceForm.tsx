import React from "react";
import { useFieldArray, Control } from "react-hook-form";
import { Button } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import FormInput, { MobileNumberInput } from "./Form/FormInput";
import FormDatePicker from "./Form/DatePicker";
import FormDropdown from "./Form/DropDown";
import FormToggle from "./Form/FormToggle";
import { steppers } from "../config/stepper";

// Find Job Experience Details step fields
const jobExperienceStep = steppers.find(
  (s) => s.stepName === "Job Experience Details"
);
const experienceFields = jobExperienceStep?.fields || [];

interface Experience {
  companyName: string;
  experienceFromDate: string;
  experienceToDate: string;
  experienceMonths: string;
  isInsideCompany: boolean;
  designation?: string;
  salary?: string;
  reasonForLeaving?: string;
}

interface InlineExperienceFormProps {
  control: Control<any>;
  experiences: Experience[];
  onExperiencesChange: (experiences: Experience[]) => void;
  isVisible: boolean;
  onClose: () => void;
}

export const JobExperienceForm: React.FC<InlineExperienceFormProps> = ({
  control,
  experiences,
  onExperiencesChange,
  isVisible,
  onClose,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  const calculateExperienceMonths = (fromDate: string, toDate: string) => {
    if (!fromDate || !toDate) return "";

    const from = new Date(fromDate);
    const to = new Date(toDate);
    const diffTime = Math.abs(to.getTime() - from.getTime());
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    return diffMonths.toString();
  };

  const handleAddExperience = () => {
    append({
      companyName: "",
      experienceFromDate: "",
      experienceToDate: "",
      experienceMonths: "",
      isInsideCompany: false,
    });
  };

  const handleDeleteExperience = (index: number) => {
    remove(index);
    const formData = control._formValues;
    onExperiencesChange(formData.experiences || []);
  };

  if (!isVisible) return null;

  return (
    <div className="mt-8 px-5 lg:px-20">
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-[#313475]">
            Add Work Experience
          </h3>
        </div>

        <div className="space-y-6">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="border border-gray-200 rounded-lg p-4 bg-gray-50"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-medium text-gray-800">
                  Experience {index + 1}
                </h4>
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteExperience(index)}
                  className="text-red-500 hover:text-red-700 hover:!border-red-400"
                >
                  Remove
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {experienceFields.map((expField) => {
                  switch (expField.type) {
                    case "text":
                    case "email":
                      return (
                        <FormInput<any>
                          key={expField.name}
                          name={`experiences.${index}.${expField.name}`}
                          control={control}
                          type="text"
                          label={expField.label}
                          placeholder={expField.placeholder}
                          required={expField.required}
                          maxLength={expField.maxLength}
                          alphaOnly={expField.alphaOnly}
                          disabled={expField.readOnly}
                        />
                      );
                    case "date":
                      return (
                        <FormDatePicker<any>
                          key={expField.name}
                          name={`experiences.${index}.${expField.name}`}
                          control={control}
                          label={expField.label}
                          placeholder={expField.placeholder}
                          required={expField.required}
                        />
                      );
                    case "toggle":
                      return (
                        <FormToggle<any>
                          key={expField.name}
                          name={`experiences.${index}.${expField.name}`}
                          control={control}
                          label={expField.label}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      );
                    case "dropdown":
                      return (
                        <FormDropdown<any>
                          key={expField.name}
                          name={`experiences.${index}.${expField.name}`}
                          control={control}
                          label={expField.label}
                          options={expField.options}
                          required={expField.required}
                        />
                      );
                    case "tel":
                      return (
                        <MobileNumberInput<any>
                          key={expField.name}
                          name={`experiences.${index}.${expField.name}`}
                          control={control}
                          label={expField.label}
                          placeholder={expField.placeholder}
                          required={expField.required}
                          disabled={expField.readOnly}
                        />
                      );
                    case "number":
                      return (
                        <FormInput<any>
                          key={expField.name}
                          name={`experiences.${index}.${expField.name}`}
                          control={control}
                          type="number"
                          label={expField.label}
                          placeholder={expField.placeholder}
                          required={expField.required}
                          disabled={expField.readOnly}
                        />
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddExperience}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Add Experience
          </Button>
          </div>
      </div>
    </div>
  );
};
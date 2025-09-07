import React from "react";
import { useFieldArray, Control } from "react-hook-form";
import { Button } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import FormInput from "./Form/FormInput";
import FormDatePicker from "./Form/DatePicker";

interface InlineEducationFormProps {
  control: Control<any>;
}

const InlineEducationForm: React.FC<InlineEducationFormProps> = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "educationList",
  });

  const handleAddEducation = () => {
    append({
      qualification: "",
      institutionName: "",
      percentage: "",
      yearOfPassing: "",
    });
  };

  // Allow removing any items including the first. Do not auto-append.

  return (
    <div className="mt-8 px-5 lg:px-20">
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-[#313475]">Additional Education</h3>
        </div>
        <p className="text-sm text-gray-500 mb-4">Add any additional education you have completed.</p> 
        {fields.map((field, index) => (
          <div key={field.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-medium text-gray-800">Education {index + 1}</h4>
              <Button type="text" danger icon={<DeleteOutlined />} onClick={() => remove(index)}>
                Remove
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <FormInput<any>
                name={`educationList.${index}.qualification`}
                control={control}
                type="text"
                label="Qualification"
                placeholder="e.g., SSLC, HSC, B.E."
                required
                maxLength={30}
                alphaOnly
              />

              <FormInput<any>
                name={`educationList.${index}.institutionName`}
                control={control}
                type="text"
                label="Institution Name"
                placeholder="e.g., XYZ University"
                required
                maxLength={30}
              />

              <FormInput<any>
                name={`educationList.${index}.percentage`}
                control={control}
                type="number"
                label="Percentage"
                placeholder="Enter Percentage"
                required
                maxLength={3}
              />

              <FormDatePicker<any>
                name={`educationList.${index}.yearOfPassing`}
                control={control}
                label="Year of Passing"
                placeholder="Select the Year of Passing"
                variant="year"
                required
              />
            </div>
          </div>
        ))}

        <div className="flex justify-end mt-4">
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddEducation}>
            Add Education
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InlineEducationForm;



import React from "react";
import { useFieldArray, Control } from "react-hook-form";
import { Button } from "antd";
import { PlusOutlined, DeleteOutlined, CloseOutlined } from "@ant-design/icons";
import FormInput, { MobileNumberInput } from "./Form/FormInput";
import FormDropdown from "./Form/DropDown";
import { childrenRelationshipOptions } from "../lib/constants";

interface Child {
  relationship: string;
  name: string;
  age: number;
  mobile?: string;
}

interface InlineChildrenFormProps {
  control: Control<any>;
  children: Child[];
  onChildrenChange: (children: Child[]) => void;
  isVisible: boolean;
  onClose: () => void;
}

export const InlineChildrenForm: React.FC<InlineChildrenFormProps> = ({
  control,
  children,
  onChildrenChange,
  isVisible,
  onClose,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "children",
  });

  const handleAddChild = () => {
    append({
      relationship: "",
      name: "",
      age: 0,
      mobile: "",
    });
  };

  const handleDeleteChild = (index: number) => {
    remove(index);
    const formData = control._formValues;
    onChildrenChange(formData.children || []);
  };

  if (!isVisible) return null;

  return (
    <div className="mt-8 px-5 lg:px-20">
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-[#313475]">
            Children Information
          </h3>
          <div className="flex items-center gap-2">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddChild}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Add Child
            </Button>
            {fields.length === 0 && (
              <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                Close
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="border border-gray-200 rounded-lg p-4 bg-gray-50"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-medium text-gray-800">
                  Child {index + 1}
                </h4>
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteChild(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormDropdown<any>
                  name={`children.${index}.relationship`}
                  control={control}
                  label="Relationship"
                  placeholder="Select Relationship"
                  options={childrenRelationshipOptions}
                  required
                />

                <FormInput<any>
                  name={`children.${index}.name`}
                  control={control}
                  type="text"
                  label="Name"
                  placeholder="Enter Name"
                  required
                />

                <FormInput<any>
                  name={`children.${index}.age`}
                  control={control}
                  type="number"
                  label="Age"
                  placeholder="Enter Age"
                  required
                />

                <MobileNumberInput<any>
                  name={`children.${index}.mobile`}
                  control={control}
                  label="Mobile"
                  placeholder="Enter Mobile Number"
                />
              </div>
            </div>
          ))}

          {fields.length === 0 && (
            <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-lg mb-2">No children added yet</p>
              <p className="text-sm">Click "Add Child" to add children information</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

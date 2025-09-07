import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { employeePersonalInformationSchema } from "./schemas/schemas";
import StepperForm from "./pages/StepperForm";
import React from "react";

type EmployeePersonalInformation = yup.InferType<
  typeof employeePersonalInformationSchema
>;

function App() {
  const { control, handleSubmit } = useForm<EmployeePersonalInformation>({
    resolver: yupResolver(employeePersonalInformationSchema) as any,
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      gender: "",
      originalDob: undefined,
      dob: undefined,
      bloodGroup: "",
      weight: undefined,
      height: undefined,
      physicallyChallenged: "",
    },
    mode: "onChange", // validates on each change
  });

  const onSubmit = (data: EmployeePersonalInformation) => {
    console.log("Form Data:", data);
  };

  return (
    <div>
      <StepperForm />
    </div>
  );
}

export default App;

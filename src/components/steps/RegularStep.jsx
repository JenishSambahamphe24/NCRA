// components/steps/RegularStep.jsx
import React from "react";
import FormInput from "../common/FormInput";
import FederalAddressInputs from "../common/FederalAddressInputs";

const RegularStep = ({
  fields,
  formData,
  onChange,
  errors,
  email,
  formSteps,
  stepId, // Added stepId prop
}) => {
  const addressFields = ["province", "district", "localLevel"];
  const isAddressStep = stepId === "address";

  const filteredFields = isAddressStep
    ? fields.filter((field) => !addressFields.includes(field.name))
    : fields;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
      {isAddressStep && (
       <div
          className={{ "sm:col-span-2 lg:col-span-1" : "" }}
        >
        <FederalAddressInputs
          formData={formData}
          onChange={onChange}
          errors={errors}
        />
        </div>
      )}
      {filteredFields?.map((field) => (
        <div
          key={field.name}
          className={
            field.type === "textarea" ? "sm:col-span-2 lg:col-span-4" : ""
          }
        >
          <FormInput
            {...field}
            value={formData[field.name]}
            onChange={onChange}
            error={errors[field.name]}
            email={email}
            formSteps={formSteps}
          />
        </div>
      ))}
    </div>
  );
};

export default RegularStep;

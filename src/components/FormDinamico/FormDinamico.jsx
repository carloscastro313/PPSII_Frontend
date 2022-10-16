import { useFormik } from "formik";
import React from "react";
import Input from "../Input/Input";

const FormDinamico = ({
  initialValues,
  validate,
  onSubmit,
  inputs = [],
  btnSubmit,
}) => {
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {inputs.map(({ type, label, id }) => (
        <ErrorInput error={formik.errors[id]} key={id}>
          <Input
            type={type}
            label={label}
            id={id}
            value={formik.values[id]}
            onChange={formik.handleChange}
          />
        </ErrorInput>
      ))}
      <div className="flex justify-center mt-3">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white py-2 min-w-[100px] text-center rounded transition-colors"
        >
          {btnSubmit}
        </button>
      </div>
    </form>
  );
};

const ErrorInput = ({ error, children }) => (
  <div className="h-[90px]">
    {children}
    {error && <span className="px-3 text-lg text-red-800">{error}</span>}
  </div>
);

export default FormDinamico;

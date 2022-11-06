import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import Input from "../Input/Input";

const FormDinamico = ({
  initialValues,
  validate,
  onSubmit,
  inputs = [],
  btnSubmit,
  cssButton = "bg-blue-600 hover:bg-blue-500 text-white",
  cssForm = "flex flex-col",
}) => {
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    console.log(initialValues);
    setValues(initialValues);
  }, [initialValues]);

  return (
    <Formik
      initialValues={values}
      validate={validate}
      onSubmit={(value, helper) => {
        onSubmit(value);
        helper.resetForm();
      }}
      enableReinitialize={true}
    >
      {({ values, errors, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit} className={cssForm}>
          {inputs.map(({ type, label, id }) => {
            if (type === "hidden")
              return <input type="hidden" id={id} key={id} />;

            return (
              <ErrorInput error={errors[id]} key={id}>
                <Input
                  type={type}
                  label={label}
                  id={id}
                  value={values[id]}
                  onChange={handleChange}
                />
              </ErrorInput>
            );
          })}
          <div className="flex justify-center mt-3">
            <button
              type="submit"
              className={
                cssButton +
                " py-2 min-w-[100px] text-center rounded transition-colors"
              }
            >
              {btnSubmit}
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

const ErrorInput = ({ error, children }) => (
  <div className="h-[90px]">
    {children}
    {error && <span className="px-3 text-lg text-red-800">{error}</span>}
  </div>
);

export default FormDinamico;

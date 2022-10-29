import { useFormik } from "formik";
import React from "react";
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
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit,
    enableReinitialize: true,
  });

  return (
    <form onSubmit={formik.handleSubmit} className={cssForm}>
      {inputs.map(({ type, label, id }) => {
        if (type === "hidden") return <input type="hidden" id={id} key={id} />;

        return (
          <ErrorInput error={formik.errors[id]} key={id}>
            <Input
              type={type}
              label={label}
              id={id}
              value={formik.values[id]}
              onChange={formik.handleChange}
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
  );
};

const ErrorInput = ({ error, children }) => (
  <div className="h-[90px]">
    {children}
    {error && <span className="px-3 text-lg text-red-800">{error}</span>}
  </div>
);

export default FormDinamico;

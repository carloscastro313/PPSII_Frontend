const loginValidation = (values) => {
  const errors = {};

  if (!values.Legajo) {
    errors.Legajo = "El legajo es obligatorio";
  }

  if (!values.Contraseña) {
    errors.Contraseña = "La contraseña es obligatorio";
  }

  return errors;
};

export default loginValidation;

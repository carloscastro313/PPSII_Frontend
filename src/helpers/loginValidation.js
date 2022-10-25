const loginValidation = (values) => {
  const errors = {};

  if (!values.Mail) {
    errors.Mail = "El email es obligatorio";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Mail)) {
    errors.Mail = "El email es invalido";
  }

  if (!values.Contraseña) {
    errors.Contraseña = "La contraseña es obligatorio";
  }

  return errors;
};

export default loginValidation;

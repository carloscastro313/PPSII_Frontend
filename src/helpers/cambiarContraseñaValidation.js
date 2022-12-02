const cambiarContraseñaValidation = (values) => {
  const errors = {};

  if (!values.Contraseña) {
    errors.Contraseña = "La contraseña es obligatorio";
  }

  if (!values.Repetir) {
    errors.Repetir = "Repita la contraseña";
  } else if (values.Repetir !== values.Contraseña) {
    errors.Repetir = "Las contraseña tienen que se iguales";
  }

  return errors;
};

export default cambiarContraseñaValidation;

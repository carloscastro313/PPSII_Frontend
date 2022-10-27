const crearAlumnoValidation = (values) => {
  const errors = {};

  if (!values.Mail) {
    errors.Mail = "El email es obligatorio";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Mail)) {
    errors.Mail = "El email es invalido";
  }

  if (!values.Contraseña) {
    errors.Contraseña = "La contraseña es obligatorio";
  }

  if (values.Nombre === "") errors.Nombre = "El nombre es obligatorio";
  else if (!/^[A-Za-z]+$/i.test(values.Nombre))
    errors.Nombre = "El nombre solo puede contener letras";
  if (values.Apellido === "") errors.Apellido = "El apellido es obligatorio";
  else if (!/^[A-Za-z]+$/i.test(values.Apellido))
    errors.Apellido = "El apellido solo puede contener letras";

  if (values.DNI === "") errors.DNI = "El dni es obligatorio";
  else if (!/^[0-9]+$/i.test(values.DNI))
    errors.DNI = "El dni solo puede contener numeros";

  return errors;
};

export default crearAlumnoValidation;

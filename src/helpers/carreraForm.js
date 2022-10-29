const carreraForm = (values) => {
  const errors = {};

  if (!values.Descripcion) {
    errors.Descripcion = "El nombre de la carrera es obligatorio";
  } else if (!values.Descripcion.length > 6) {
    errors.Descripcion =
      "El nombre de la carrera debe contener al menos 7 letras";
  }

  return errors;
};

export default carreraForm;

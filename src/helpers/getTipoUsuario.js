// eslint-disable-next-line import/no-anonymous-default-export
export default (id) => {
  switch (id) {
    case 1:
      return "administrador";
    case 2:
      return "secretaria";
    case 3:
      return "docente";
    case 4:
      return "alumno";
    default:
      return "";
  }
};

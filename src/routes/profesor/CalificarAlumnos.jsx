import React from "react";
import Layout from "../../components/Layout/Layout";
import useProtectedRoute from "../../hooks/useProtectedRoute";

const CalificarAlumnos = () => {
  useProtectedRoute("profesor");

  return <Layout>MateriaAsignadas</Layout>;
};

export default CalificarAlumnos;

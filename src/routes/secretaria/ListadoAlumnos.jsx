import React from "react";
import Layout from "../../components/Layout/Layout";
import useProtectedRoute from "../../hooks/useProtectedRoute";

const ListadoAlumnos = () => {
  useProtectedRoute("secretaria");

  return <Layout>ListadoAlumnos</Layout>;
};

export default ListadoAlumnos;

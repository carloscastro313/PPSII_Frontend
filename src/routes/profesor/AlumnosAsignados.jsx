import React from "react";
import Layout from "../../components/Layout/Layout";
import useProtectedRoute from "../../hooks/useProtectedRoute";

const AlumnosAsignados = () => {
  useProtectedRoute("profesor");

  return <Layout>AlumnosAsignadas</Layout>;
};

export default AlumnosAsignados;

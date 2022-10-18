import React from "react";
import Layout from "../../components/Layout/Layout";
import useProtectedRoute from "../../hooks/useProtectedRoute";

const Academico = () => {
  useProtectedRoute("alumno");

  return <Layout>Academico</Layout>;
};

export default Academico;

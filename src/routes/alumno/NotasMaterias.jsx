import React from "react";
import Layout from "../../components/Layout/Layout";
import useProtectedRoute from "../../hooks/useProtectedRoute";

const NotasMaterias = () => {
  useProtectedRoute("alumno");

  return <Layout>NotasMaterias</Layout>;
};

export default NotasMaterias;

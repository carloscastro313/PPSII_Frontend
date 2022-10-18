import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import useProtectedRoute from "../../hooks/useProtectedRoute";

const Inscripcion = ({ tipo }) => {
  useProtectedRoute("alumno");

  useEffect(() => {
    if (tipo === "rendir") {
    } else {
    }
  }, [tipo]);

  return <Layout>Inscripcion</Layout>;
};

export default Inscripcion;

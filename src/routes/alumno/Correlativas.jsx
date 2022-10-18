import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import useProtectedRoute from "../../hooks/useProtectedRoute";

const Correlativas = ({ tipo }) => {
  useProtectedRoute("alumno");

  useEffect(() => {
    if (tipo === "rendir") {
    } else {
    }
  }, [tipo]);

  return <Layout>Correlativas</Layout>;
};

export default Correlativas;

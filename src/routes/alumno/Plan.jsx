import React from "react";
import Layout from "../../components/Layout/Layout";
import useProtectedRoute from "../../hooks/useProtectedRoute";

const Plan = () => {
  useProtectedRoute("alumno");

  return <Layout>Plan</Layout>;
};

export default Plan;

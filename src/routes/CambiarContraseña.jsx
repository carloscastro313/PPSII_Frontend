import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container/Container";
import FormDinamico from "../components/FormDinamico/FormDinamico";
import Layout from "../components/Layout/Layout";
import LoadingModal from "../components/LoadingModal/LoadingModal";
import HTTP from "../config/axios";
import AuthContext from "../contexts/auth/AuthContext";
import ErrorContext from "../contexts/errorPopup/ErrorContext";
import cambiarContraseñaValidation from "../helpers/cambiarContraseñaValidation";

const formInput = [
  {
    type: "password",
    label: "Contraseña nueva",
    id: "Contraseña",
  },
  {
    type: "password",
    label: "Repetir",
    id: "Repetir",
  },
];

const initialValues = {
  Contraseña: "",
  Repetir: "",
};

const CambiarContraseña = () => {
  const { usuario } = useContext(AuthContext);
  const { showError } = useContext(ErrorContext);

  const navigation = useNavigate();

  const [fetching, setFetching] = useState(false);

  const submitHandler = ({ Contraseña }) => {
    setFetching(true);

    HTTP.put("/usuarios/cambiarcontrasenia/" + usuario.Id, { Contraseña })
      .then(() => {
        navigation("/");
      })
      .catch((error) => {
        console.log(error);
        showError(error.response.data.msg);
      })
      .finally(() => {
        fetching(false);
      });
  };

  return (
    <Layout>
      <LoadingModal show={fetching} />
      <Container cssClass="w-3/4 lg:w-1/4 min-h-[200px] bg-blue-500">
        <h1 className="text-2xl text-center my-4">Iniciar sesión</h1>
        <FormDinamico
          initialValues={initialValues}
          onSubmit={submitHandler}
          validate={cambiarContraseñaValidation}
          inputs={formInput}
          btnSubmit="Cambiar"
        />
      </Container>
    </Layout>
  );
};

export default CambiarContraseña;

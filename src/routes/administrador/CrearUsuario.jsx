import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../../components/Container/Container";
import FormDinamico from "../../components/FormDinamico/FormDinamico";
import Layout from "../../components/Layout/Layout";
import HTTP from "../../config/axios";
import ErrorContext from "../../contexts/errorPopup/ErrorContext";
import crearAlumnoValidation from "../../helpers/crearAlumnoValidation";

var formInput = [
  {
    type: "text",
    label: "Email",
    id: "Mail",
  },
  {
    type: "password",
    label: "Contraseña",
    id: "Contraseña",
  },
  {
    type: "text",
    label: "Nombre",
    id: "Nombre",
  },
  {
    type: "text",
    label: "Apellido",
    id: "Apellido",
  },
  {
    type: "text",
    label: "DNI",
    id: "DNI",
  },
];

const initialValues = {
  Mail: "",
  Contraseña: "",
  Nombre: "",
  Apellido: "",
  DNI: "",
};

const CrearUsuario = ({
  modificacion = true,
  TipoUsuario,
  title = "",
  redirect = "/",
}) => {
  const { showError } = useContext(ErrorContext);

  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialValues);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (modificacion) {
      setLoading(true);

      const id = params["id"];

      HTTP.get("/usuarios/" + id)
        .then(({ data }) => {
          if (data.length !== 1) {
            navigate(redirect);
            showError("El usuario no existe");
          }
          const [{ Mail, Nombre, Apellido, DNI }] = data;
          setValues({
            Mail,
            Contraseña: "",
            Nombre,
            Apellido,
            DNI,
          });

          setLoading(false);
        })
        .catch(({ response }) => {
          console.log(response);
          showError(response.data.msg && "Hubo un error inesperado");
          navigate(redirect);
        });
    }
  }, []);

  const submitHandler = (values) => {
    if (modificacion)
      HTTP.put("/usuarios/" + params["id"], { ...values, TipoUsuario })
        .then(() => {
          navigate(redirect);
        })
        .catch(({ response: { data } }) => showError(data.msg));
    else
      HTTP.post("/usuarios/", { ...values, TipoUsuario })
        .then(() => {
          navigate(redirect);
        })
        .catch(({ response: { data } }) => showError(data.msg));
  };
  return (
    <Layout>
      <Container cssClass="w-1/2 h-5/6 min-h-[650px] bg-blue-500">
        <h1 className="text-xl text-center">{title}</h1>
        <div className="flex flex-col justify-around">
          {loading ? (
            "Cargando..."
          ) : (
            <FormDinamico
              inputs={formInput}
              initialValues={values}
              onSubmit={submitHandler}
              btnSubmit="Crear"
              validate={crearAlumnoValidation}
            />
          )}
        </div>
      </Container>
    </Layout>
  );
};

export default CrearUsuario;

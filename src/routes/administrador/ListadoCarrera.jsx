import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import Layout from "../../components/Layout/Layout";
import ListaDinamica from "../../components/ListaDinamica/ListaDinamica";
import HTTP from "../../config/axios";
import ErrorContext from "../../contexts/errorPopup/ErrorContext";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import FormCarrera from "../../modals/FormCarrera";

const mock = [
  {
    Id: 1,
    PlanActual: null,
    Descripcion: "",
    Estado: "activo",
  },
  {
    Id: 2,
    PlanActual: null,
    Descripcion: "",
    Estado: "activo",
  },
];

const ListadoCarrera = () => {
  const { showError } = useContext(ErrorContext);

  const [carreras, setCarreras] = useState([]);
  const [modal, setModal] = useState(false);
  const [modificar, setModificar] = useState(false);
  const [values, setValues] = useState(null);

  useProtectedRoute("administrador");

  const navigate = useNavigate();

  const fetch = useCallback(() => {
    HTTP.get("/administraciones/carrera").then(({ data }) => {
      setCarreras(data);
    });
  }, []);

  useEffect(() => {
    if (!modal) fetch();
  }, [fetch, modal]);

  const actions = [
    {
      name: "Modificar",
      onClickEvent: (values) => {
        // navigate("/administrador/modificardocente/" + Legajo);
      },
      cssClass: "bg-yellow-600 hover:bg-yellow-500 text-white",
    },
    {
      name: "Eliminar",
      onClickEvent: (values) => {
        //   HTTP.delete("/usuarios/" + Legajo)
        //     .then(() => fetch())
        //     .catch(({ reponse: { data } }) => showError(data.msg));
      },
      cssClass: "bg-red-600 hover:bg-red-500 text-white",
    },
  ];

  return (
    <>
      <FormCarrera closeModal={setModal} visible={modal} />
      <Layout>
        <Container>
          <div className="h-1/5 flex justify-between">
            <h1 className="mb-3 text-xl">Listado de secretaria</h1>
            <div>
              <Button
                name="Crear usuario"
                onClickEvent={() => setModal(true)}
              />
            </div>
          </div>
          <div className="h-3/4">
            <div className="h-full bg-white overflow-auto">
              {carreras.length > 0 && (
                <ListaDinamica
                  actions={actions}
                  listado={formarter(carreras)}
                />
              )}
              {carreras.length === 0 && (
                <div className="flex justify-center h-full">
                  <h1 className="my-auto text-xl">No hay carreras creadas</h1>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
};

const formarter = (data = []) => {
  return data.map(({ Id, Descripcion }) => {
    return {
      "N°": Id,
      Nombre: Descripcion,
    };
  });
};

export default ListadoCarrera;

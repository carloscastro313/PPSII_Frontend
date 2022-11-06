import React, { useCallback, useContext, useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import Layout from "../../components/Layout/Layout";
import ListaDinamicaClick from "../../components/ListaDinamicaClick/ListaDinamicaClick";
import Spinner from "../../components/Spinner/Spinner";
import HTTP from "../../config/axios";
import ErrorContext from "../../contexts/errorPopup/ErrorContext";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import CarreraOptions from "../../modals/CarreraOptions";
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
  const [form, setForm] = useState(false);
  const [modificar, setModificar] = useState(false);
  const [values, setValues] = useState(null);
  const [options, setOptions] = useState(false);
  const [fetching, setFetching] = useState(true);

  useProtectedRoute("administrador");

  const navigate = useNavigate();

  const fetch = useCallback(() => {
    setFetching(true);
    HTTP.get("/administraciones/carrera")
      .then(({ data }) => {
        setCarreras(data);
      })
      .finally(() => setFetching(false));
  }, []);

  useEffect(() => {
    if (!form) fetch();
  }, [fetch, form]);

  const openOptions = (value) => {
    console.log(carreras.find((c) => c.Id === value["N°"]));
    setValues(carreras.find((c) => c.Id === value["N°"]));
    setOptions(true);
  };

  const closeOptions = () => {
    setValues(null);
    setOptions(false);
  };

  const openForm = () => {
    setOptions(false);
    setModificar(true);
    setForm(true);
  };

  const closeFrom = () => {
    setForm(false);
    setValues(null);
    setModificar(false);
  };

  const generarPlan = () => {
    navigate({
      pathname: "/administrador/crearplan/" + values["Id"],
      search: createSearchParams({
        plan: values.PlanActual,
      }).toString(),
    });
  };

  const verPlanes = () => {
    navigate({
      pathname: "/administrador/listadoplan/" + values["Id"],
    });
  };

  return (
    <>
      <FormCarrera
        closeModal={closeFrom}
        visible={form}
        modifcar={modificar}
        value={values}
      />
      <CarreraOptions
        show={options}
        closeModal={closeOptions}
        ModificarMateria={openForm}
        GenerarPlan={generarPlan}
        VerPlanes={verPlanes}
        carrera={values}
      />
      <Layout>
        <Container>
          <div className="h-1/5 flex justify-between">
            <h1 className="mb-3 text-xl">Listado de carrera</h1>
            <div>
              <Button name="Crear usuario" onClickEvent={() => setForm(true)} />
            </div>
          </div>
          <div className="h-3/4">
            <div className={`h-full overflow-auto ${!fetching && "bg-white"}`}>
              {carreras.length > 0 && (
                <ListaDinamicaClick
                  onClickEvent={openOptions}
                  listado={formarter(carreras)}
                />
              )}
              {carreras.length === 0 && !fetching && (
                <div className="flex justify-center h-full">
                  <h1 className="my-auto text-xl">No hay carreras creadas</h1>
                </div>
              )}

              {fetching && (
                <div className="flex justify-center items-center h-full">
                  <Spinner />
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
  return data.map(({ Id, Descripcion, PlanActual }) => {
    return {
      "N°": Id,
      Nombre: Descripcion,
      Plan: PlanActual === "" ? "-" : PlanActual,
    };
  });
};

export default ListadoCarrera;

import React, { useCallback, useContext, useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import ExcelExport from "../../components/ExcelExport/ExcelExport";
import Layout from "../../components/Layout/Layout";
import ListaDinamicaClick from "../../components/ListaDinamicaClick/ListaDinamicaClick";
import LoadingModal from "../../components/LoadingModal/LoadingModal";
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
  const [carreras, setCarreras] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState(false);
  const [modificar, setModificar] = useState(false);
  const [values, setValues] = useState(null);
  const [options, setOptions] = useState(false);

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

  const crearCronograma = () => {
    navigate({
      pathname: "/administrador/cronograma/" + values["Id"],
      search: createSearchParams({
        plan: values.PlanActual,
      }).toString(),
    });
  };

  const modificarCronograma = () => {
    navigate({
      pathname: "/administrador/cronograma/modificacion/" + values["Id"],
      search: createSearchParams({
        plan: values.PlanActual,
      }).toString(),
    });
  };

  const AsignarDocente = () => {
    navigate({
      pathname: "/administrador/cronograma/asignarDocente/" + values["Id"],
      search: createSearchParams({
        plan: values.PlanActual,
      }).toString(),
    });
  };

  return (
    <>
      <FormCarrera
        closeModal={closeFrom}
        visible={form}
        modifcar={modificar}
        value={values}
        setFetching={setFetching}
      />
      <CarreraOptions
        show={options}
        closeModal={closeOptions}
        ModificarMateria={openForm}
        GenerarPlan={generarPlan}
        VerPlanes={verPlanes}
        carrera={values}
        CrearCronograma={crearCronograma}
        ModificarCronograma={modificarCronograma}
        AsignarDocente={AsignarDocente}
      />
      <LoadingModal show={fetching} />
      <Layout>
        <Container>
          <div className="h-1/6 flex justify-between">
            <h1 className="my-auto text-xl text-white">Listado de carrera</h1>
            <div className="h-[50px] my-auto flex gap-3">
              <ExcelExport filename="carreras" lista={formarter(carreras)} />
              <Button
                name="Crear carrera"
                onClickEvent={() => setForm(true)}
                cssClass="bg-blue-600 hover:bg-blue-500 text-white p-3"
              />
            </div>
          </div>
          <div className="h-3/4 mt-3">
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

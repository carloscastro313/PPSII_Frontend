import React, { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import Layout from "../../components/Layout/Layout";
import ListaDinamicaClick from "../../components/ListaDinamicaClick/ListaDinamicaClick";
import LoadingModal from "../../components/LoadingModal/LoadingModal";
import HTTP from "../../config/axios";
import useProtectedRoute from "../../hooks/useProtectedRoute";

const FinalesAnotados = () => {
  const [materias, setMaterias] = useState([]);
  const [fetching, setFetching] = useState(true);
  useProtectedRoute("alumno");

  useEffect(() => {
    setFetching(true);
    HTTP.get("/alumnos/getExamenesAnotados/")
      .then(({ data }) => {
        setMaterias(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setFetching(false);
      });
  }, []);

  return (
    <Layout>
      <LoadingModal show={fetching} />
      <Container>
        <div className="h-1/6">
          <h1 className="my-auto text-xl text-white">
            Listado de finales pendientes
          </h1>
        </div>
        <div className="h-3/4 mt-3">
          <div className="h-full bg-white overflow-auto">
            {!fetching &&
              (materias.length > 0 ? (
                <ListaDinamicaClick
                  // actions={actions}
                  skip={[
                    "AlumnoMateriaDivision",
                    "IdMateria",
                    "IdMateriaDivision",
                    "IdCronograma",
                  ]}
                  listado={transformData(materias)}
                  onClickEvent={() => {}}
                />
              ) : (
                <div className="flex justify-center h-full">
                  <h1 className="my-auto text-xl">No hay finales pendientes</h1>
                </div>
              ))}
          </div>
        </div>
      </Container>
    </Layout>
  );
};

const transformData = (arr = []) =>
  arr.map((value) => {
    return {
      ...value,
      Fecha: new Date(value.Fecha).toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    };
  });
export default FinalesAnotados;

import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/Container/Container";
import Layout from "../../components/Layout/Layout";
import ListaDinamicaClick from "../../components/ListaDinamicaClick/ListaDinamicaClick";
import Spinner from "../../components/Spinner/Spinner";
import HTTP from "../../config/axios";
import useProtectedRoute from "../../hooks/useProtectedRoute";

const ListadoPlan = () => {
  useProtectedRoute("administrador");

  const [planes, setPlanes] = useState([]);
  const [fetching, setFetching] = useState(true);

  const params = useParams();

  const fetch = useCallback(() => {
    setFetching(true);
    HTTP.get("/administraciones/planEstudio/carrera/" + params["id"])
      .then(({ data }) => {
        setPlanes(data);
      })
      .finally(() => setFetching(false));
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <Layout>
      <Container>
        <div className="h-1/5 flex">
          <h1 className="mb-3 text-xl">Listado de plan</h1>
        </div>
        <div className="h-3/4">
          <div className={`h-full overflow-auto ${!fetching && "bg-white"}`}>
            {planes.length > 0 && (
              <ListaDinamicaClick
                onClickEvent={() => {}}
                listado={formater(planes)}
              />
            )}
            {planes.length === 0 && !fetching && (
              <div className="flex justify-center h-full">
                <h1 className="my-auto text-xl">No hay planes</h1>
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
  );
};

const formater = (arr = []) => {
  return arr.map(({ FechaCreacion, Nombre, Duracion }) => {
    return {
      Creada: new Date(FechaCreacion).toLocaleDateString("es-ar"),
      Plan: Nombre,
      Cuatrimestres: Duracion,
    };
  });
};

export default ListadoPlan;

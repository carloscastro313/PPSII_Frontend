import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Container from "../../components/Container/Container";
import Layout from "../../components/Layout/Layout";
import ListaDinamica from "../../components/ListaDinamica/ListaDinamica";
import ListaDinamicaClick from "../../components/ListaDinamicaClick/ListaDinamicaClick";
import LoadingModal from "../../components/LoadingModal/LoadingModal";
import HTTP from "../../config/axios";
import AuthContext from "../../contexts/auth/AuthContext";
import useProtectedRoute from "../../hooks/useProtectedRoute";

const Plan = () => {
  const { usuario } = useContext(AuthContext);
  useProtectedRoute("alumno");

  const [materias, setMaterias] = useState([]);
  const [fetching, setFetching] = useState(true);

  const [cuatrimestre, setCuatrimestre] = useState(1);

  useEffect(() => {
    setFetching(true);
    HTTP.get("/alumnos/getMateriasPlan")
      .then(({ data }) => {
        setMaterias(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setFetching(false));
  }, []);

  return (
    <Layout>
      <LoadingModal show={fetching} />
      <Container>
        <div className="h-1/6 flex justify-between">
          <h1 className="my-auto text-xl text-white">Plan de estudio</h1>
          <div className="h-[50px] flex gap-3"></div>
        </div>
        <div className="h-3/4 mt-3">
          <div className="h-full bg-white overflow-auto">
            {!fetching &&
              (materias.length > 0 ? (
                <ListaDinamicaClick
                  // actions={actions}
                  listado={filterMaterias(materias, cuatrimestre)}
                />
              ) : (
                <div className="flex justify-center h-full">
                  <h1 className="my-auto text-xl">
                    No tienes materias asignadas
                  </h1>
                </div>
              ))}
          </div>
          <div className="flex flex-row gap-3 bg-gray-400 p-2">
            <p>Cuatrimestre:</p>
            <select
              value={cuatrimestre}
              onChange={(e) => setCuatrimestre(e.target.value)}
            >
              {getCuatrimestres(materias || []).map((aux) => (
                <option value={aux}>{aux}</option>
              ))}
            </select>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

const getCuatrimestres = (arr = []) => {
  let cua = [];

  arr.forEach((val) => {
    if (!cua.includes(val.Cuatrimestre)) cua.push(val.Cuatrimestre);
  });

  return cua.sort();
};

const filterMaterias = (arr = [], cuatrimestre) => {
  return arr.filter((val) => val.Cuatrimestre == cuatrimestre);
};

export default Plan;

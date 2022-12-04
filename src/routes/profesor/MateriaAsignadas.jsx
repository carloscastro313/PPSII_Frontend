import React, { useEffect } from "react";
import { useState } from "react";
import Container from "../../components/Container/Container";
import Layout from "../../components/Layout/Layout";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import LoadingModal from "../../components/LoadingModal/LoadingModal";
import { useContext } from "react";
import AuthContext from "../../contexts/auth/AuthContext";
import HTTP from "../../config/axios";
import ListaDinamicaClick from "../../components/ListaDinamicaClick/ListaDinamicaClick";
import { useNavigate } from "react-router-dom";

const MateriaAsignadas = () => {
  const { usuario } = useContext(AuthContext);
  useProtectedRoute("docente");

  const navigate = useNavigate();

  const [materias, setMaterias] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    setFetching(true);
    HTTP.get("/docentes/materiasDivision/" + usuario.Id)
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

  const selectMateria = (value) => {
    navigate("/profesor/alumnos/" + value.IdMateriaDivision);
  };

  return (
    <Layout>
      <LoadingModal show={fetching} />
      <Container>
        <div className="h-1/6 flex justify-between">
          <h1 className="my-auto text-xl text-white">Mis materias</h1>
          <div className="h-[50px] flex gap-3"></div>
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
                  listado={materias}
                  onClickEvent={(value) => selectMateria(value)}
                />
              ) : (
                <div className="flex justify-center h-full">
                  <h1 className="my-auto text-xl">
                    No tienes materias asignadas
                  </h1>
                </div>
              ))}
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default MateriaAsignadas;

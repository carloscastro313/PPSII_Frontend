import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../components/Container/Container";
import Layout from "../../components/Layout/Layout";
import ListaDinamicaClick from "../../components/ListaDinamicaClick/ListaDinamicaClick";
import LoadingModal from "../../components/LoadingModal/LoadingModal";
import HTTP from "../../config/axios";
import useProtectedRoute from "../../hooks/useProtectedRoute";

const VerFinales = () => {
  useProtectedRoute("docente");

  const navigate = useNavigate();

  const [materias, setMaterias] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    setFetching(true);
    HTTP.get("/docentes/getFinalDocente")
      .then(({ data }) => {
        console.log(data);
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
    navigate("/profesor/calificar/" + value.Id);
  };

  return (
    <Layout>
      <LoadingModal show={fetching} />
      <Container>
        <div className="h-1/6 flex justify-between">
          <h1 className="my-auto text-xl text-white">Finales a dictar</h1>
          <div className="h-[50px] flex gap-3"></div>
        </div>
        <div className="h-3/4 mt-3">
          <div className="h-full bg-white overflow-auto">
            {!fetching &&
              (materias.length > 0 ? (
                <ListaDinamicaClick
                  // actions={actions}
                  skip={["Id"]}
                  listado={transformData(materias)}
                  onClickEvent={(value) => selectMateria(value)}
                />
              ) : (
                <div className="flex justify-center h-full">
                  <h1 className="my-auto text-xl">
                    No tienes finales asignadas
                  </h1>
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

export default VerFinales;

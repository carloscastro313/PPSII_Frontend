import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../../components/Container/Container";
import Layout from "../../components/Layout/Layout";
import ListaDinamicaClick from "../../components/ListaDinamicaClick/ListaDinamicaClick";
import LoadingModal from "../../components/LoadingModal/LoadingModal";
import HTTP from "../../config/axios";
import ErrorContext from "../../contexts/errorPopup/ErrorContext";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import NotaFinal from "../../modals/NotaFinal";

const AlumnoFinal = () => {
  const { showError } = useContext(ErrorContext);
  useProtectedRoute("docente");

  const params = useParams();
  const navigate = useNavigate();

  const [materias, setMaterias] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [selected, setSelected] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setFetching(true);
    HTTP.get("/docentes/getFinalAlumno/" + params.id)
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
    setSelected(value);
    setShow(true);
  };

  const closeModal = () => {
    setSelected(null);
    setShow(false);
  };

  const agregarNota = (nota) => {
    setFetching(true);

    HTTP.post("/docentes/agregarNotaFinalAAlumno", {
      IdExamenFinalAlumno: selected.IdExamenFinalAlumno,
      IdAlumnoMaterias: selected.IdAlumnoMaterias,
      nota,
    })
      .then(() => {
        HTTP.get("/docentes/getFinalAlumno/" + params["id"])
          .then(({ data }) => {
            setMaterias(data);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setFetching(false);
          });
      })
      .catch((error) => {
        showError(error.response.data.msg);
      })
      .finally(() => {
        closeModal();
        setFetching(false);
      });
  };

  return (
    <Layout>
      <NotaFinal show={show} closeModal={closeModal} submit={agregarNota} />
      <LoadingModal show={fetching} />
      <Container>
        <div className="h-1/6 flex justify-between">
          <h1 className="my-auto text-xl text-white">
            Calificar final a alumno
          </h1>
          <div className="h-[50px] flex gap-3"></div>
        </div>
        <div className="h-3/4 mt-3">
          <div className="h-full bg-white overflow-auto">
            {!fetching &&
              (materias.length > 0 ? (
                <ListaDinamicaClick
                  // actions={actions}
                  skip={["IdExamenFinalAlumno", "IdAlumnoMaterias"]}
                  listado={materias}
                  onClickEvent={(value) => selectMateria(value)}
                />
              ) : (
                <div className="flex justify-center h-full">
                  <h1 className="my-auto text-xl">
                    No hay alumnos para calificar
                  </h1>
                </div>
              ))}
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default AlumnoFinal;

import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/Container/Container";
import ExcelExport from "../../components/ExcelExport/ExcelExport";
import Layout from "../../components/Layout/Layout";
import ListaDinamicaClick from "../../components/ListaDinamicaClick/ListaDinamicaClick";
import LoadingModal from "../../components/LoadingModal/LoadingModal";
import HTTP from "../../config/axios";
import ErrorContext from "../../contexts/errorPopup/ErrorContext";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import AlumnoMateria from "../../modals/AlumnoMateria";

const AlumnosAsignados = () => {
  const { showError } = useContext(ErrorContext);

  useProtectedRoute("docente");

  const params = useParams();

  const [alumnos, setAlumnos] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [selected, setSelected] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setFetching(true);

    HTTP.get("/docentes/getAlumnosPorMateriaDivision/" + params["id"])
      .then(({ data }) => {
        setAlumnos(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setFetching(false);
      });
  }, []);

  const selectAlumno = (value) => {
    setSelected(value);
    setShow(true);
  };

  const closeModal = () => {
    setSelected(null);
    setShow(false);
  };

  const cambiarNotas = (notas, aprobarCursada) => {
    setFetching(true);

    HTTP.post("/docentes/agregarNotasAAlumno", {
      idAlumnoMateria: selected.AlumnoMateriaDivision.Id,
      notas,
      aprobarCursada,
    })
      .then(() => {
        HTTP.get("/docentes/getAlumnosPorMateriaDivision/" + params["id"])
          .then(({ data }) => {
            setAlumnos(data);
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
      });
  };

  const desaprobarAlumno = (notas) => {
    HTTP.post("/docentes/desaprobarAlumno", {
      idAlumnoMateria: selected.AlumnoMateriaDivision.Id,
      notas,
    })
      .then(() => {
        HTTP.get("/docentes/getAlumnosPorMateriaDivision/" + params["id"])
          .then(({ data }) => {
            setAlumnos(data);
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
      });
  };

  return (
    <Layout>
      <AlumnoMateria
        show={show}
        closeModal={closeModal}
        AlumnoMateria={selected}
        submit={cambiarNotas}
        desaprobarAlumno={desaprobarAlumno}
      />
      <LoadingModal show={fetching} />
      <Container>
        <div className="h-1/6 flex justify-between">
          <h1 className="my-auto text-xl text-white">Mis alumnos</h1>
          <div className="h-[50px] my-auto flex gap-3">
            <ExcelExport filename="carreras" lista={formarter(alumnos)} />
          </div>
        </div>
        <div className="h-3/4 mt-3">
          <div className="h-full bg-white overflow-auto">
            {!fetching &&
              (alumnos.length > 0 ? (
                <ListaDinamicaClick
                  // actions={actions}
                  skip={["AlumnoMateriaDivision"]}
                  listado={alumnos}
                  onClickEvent={(value) => selectAlumno(value)}
                />
              ) : (
                <div className="flex justify-center h-full">
                  <h1 className="my-auto text-xl">No hay alumnos</h1>
                </div>
              ))}
          </div>
        </div>
      </Container>
    </Layout>
  );
};

const formarter = (data = []) => {
  return data.map(({ Nombre, Apellido, Mail, DNI }) => {
    return {
      Nombre,
      Apellido,
      Mail,
      DNI,
    };
  });
};

export default AlumnosAsignados;

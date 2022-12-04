import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../../components/Container/Container";
import Layout from "../../components/Layout/Layout";
import ListaDinamicaClick from "../../components/ListaDinamicaClick/ListaDinamicaClick";
import LoadingModal from "../../components/LoadingModal/LoadingModal";
import HTTP from "../../config/axios";
import AuthContext from "../../contexts/auth/AuthContext";
import ErrorContext from "../../contexts/errorPopup/ErrorContext";
import Confirmacion from "../../modals/Confirmacion";

const AnotarMateria = ({ isRoute = false }) => {
  const { showError } = useContext(ErrorContext);
  const { usuario } = useContext(AuthContext);
  const params = useParams();
  const navigate = useNavigate();

  const [fetching, setFetching] = useState(true);
  const [materias, setMaterias] = useState([]);
  const [IdAlumno, setIdAlumno] = useState(-1);

  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    let id = isRoute ? params.id : usuario.Id;
    setIdAlumno(id);

    setFetching(true);

    HTTP.get("/alumnos/getInscripcionMateria/" + id)
      .then(({ data }) => {
        console.log(data);
        setMaterias(data);
      })
      .catch((error) => {
        console.log(error);
        if (!error.response.data.permitido) {
          if (isRoute) {
            navigate("/secretaria/listaAlumnos");
          } else {
            navigate("/");
          }
        }
        showError(error.response.data.msg);
      })
      .finally(() => {
        setFetching(false);
      });
  }, []);

  const asignar = (value) => {
    setFetching(true);

    HTTP.post("/alumnos/InscribirAlumnoSecretaria", {
      IdAlumno,
      IdMateriaDivision: selected.Id,
    })
      .then(() => {
        HTTP.get("/alumnos/getInscripcionMateria/" + IdAlumno).then(
          ({ data }) => {
            console.log(data);
            setMaterias(data);
          }
        );
      })
      .catch((error) => {
        showError(error.response.data.msg);
      })
      .finally(() => {
        closeModal();
        setFetching(false);
      });
  };

  const seleccionar = (value) => {
    setSelected(value);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelected(null);
    setShowModal(false);
  };

  return (
    <Layout>
      <Confirmacion
        accept={asignar}
        deny={closeModal}
        titulo={"Confirmar"}
        mensaje={
          isRoute
            ? "¿Esta seguro de anotar al alumno a esta materia?"
            : "¿Esta seguro de anotarse a esta materia?"
        }
        show={showModal}
      />
      <LoadingModal show={fetching} />
      <Container>
        <div className="h-1/6 flex flex-col justify-between">
          <h1 className="my-auto text-xl text-white">
            {isRoute ? "Anotar alumno a materia" : "Anotarse a materia"}
          </h1>
          <div className="h-[50px] flex gap-3"></div>
        </div>
        <div className="h-3/4 mt-3">
          <div className="h-full bg-white overflow-auto">
            {!fetching &&
              (materias.length > 0 ? (
                <ListaDinamicaClick
                  listado={materias}
                  onClickEvent={seleccionar}
                  skip={["Id"]}
                />
              ) : (
                <div className="flex justify-center h-full">
                  <h1 className="my-auto text-xl">No hay materias</h1>
                </div>
              ))}
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default AnotarMateria;

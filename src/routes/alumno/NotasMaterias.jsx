import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../components/Container/Container";
import Layout from "../../components/Layout/Layout";
import ListaDinamicaClick from "../../components/ListaDinamicaClick/ListaDinamicaClick";
import LoadingModal from "../../components/LoadingModal/LoadingModal";
import HTTP from "../../config/axios";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import DetalleNota from "../../modals/DetalleNota";

const NotasMaterias = () => {
  useProtectedRoute("alumno");

  const navigate = useNavigate();

  const [fetching, setFetching] = useState(true);
  const [materias, setMaterias] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setFetching(true);
    HTTP.get("/alumnos/getNotasMaterias")
      .then(({ data }) => {
        setMaterias(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setFetching(false));
  }, []);

  const seleccionar = (val) => {
    setSelected(val);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelected(null);
    setShowModal(false);
  };

  return (
    <Layout>
      <DetalleNota show={showModal} closeModal={closeModal} notas={selected} />
      <LoadingModal show={fetching} />
      <Container>
        <div className="h-1/5 flex flex-col justify-between">
          <h1 className="mb-3 text-xl">Asignar alumno a materia</h1>
          <div className="h-[50px] flex gap-3"></div>
        </div>
        <div className="h-3/4">
          <div className="h-full bg-white overflow-auto">
            {!fetching &&
              (materias.length > 0 ? (
                <ListaDinamicaClick
                  listado={materias}
                  onClickEvent={seleccionar}
                  skip={[
                    "IdMateria",
                    "NotaPrimerParcial",
                    "NotaSegundoParcial",
                    "NotaRecuperatorioPrimerParcial",
                    "NotaRecuperatorioPrimerParcial2",
                    "NotaRecuperatorioSegundoParcial",
                    "NotaRecuperatorioSegundoParcial2",
                  ]}
                />
              ) : (
                <div className="flex justify-center h-full">
                  <h1 className="my-auto text-xl">No hay notas</h1>
                </div>
              ))}
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default NotasMaterias;

import React, { useEffect, useState } from "react";
import Container from "../components/Container/Container";
import Layout from "../components/Layout/Layout";
import ListaDinamicaClick from "../components/ListaDinamicaClick/ListaDinamicaClick";
import LoadingModal from "../components/LoadingModal/LoadingModal";
import HTTP from "../config/axios";
import DetalleAviso from "../modals/DetalleAviso";

const ListadoAvisos = () => {
  const [avisos, setAvisos] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [selected, setSelected] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setFetching(true);
    HTTP.get("/administraciones/todosLosAvisos")
      .then(({ data }) => {
        console.log(data);
        setAvisos(data);
      })
      .finally(() => {
        setFetching(false);
      });
  }, []);

  const seleccionar = async (value) => {
    try {
      setFetching(true);

      await HTTP.post("/avisos/marcarLeido", {
        idAvisoUsuarios: value.IdAvisoUsuarios,
      });

      const { data } = await HTTP.get("/administraciones/todosLosAvisos");

      setAvisos(data);
      setSelected(value);
      setShow(true);
    } catch (error) {
    } finally {
      setFetching(false);
    }
  };

  const closeModal = () => {
    setShow(false);
    setSelected(null);
  };

  return (
    <Layout>
      {show && (
        <DetalleAviso show={show} closeModal={closeModal} aviso={selected} />
      )}
      <LoadingModal show={fetching} />
      <Container>
        <div className="h-1/6 flex flex-col justify-between">
          <h1 className="my-auto text-xl text-white">Mis avisos</h1>
          <div className="h-[50px] flex gap-3"></div>
        </div>
        <div className="h-3/4 mt-3">
          <div className="h-full bg-white overflow-auto">
            {!fetching &&
              (avisos.length > 0 ? (
                <ListaDinamicaClick
                  listado={transformData(avisos)}
                  onClickEvent={(value) => seleccionar(value)}
                  skip={[
                    "Mensaje",
                    "IdAvisoUsuarios",
                    "TipoUsuarioEmisor",
                    "IdAviso",
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

const transformData = (arr = []) =>
  arr
    .map((values) => {
      return {
        ...values,
        Leido: values.Leido === 1 ? "Si" : "No",
        Fecha: new Date(values.Fecha).toLocaleDateString("es-AR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }),
      };
    })
    .sort(function (b, a) {
      return new Date(b.Fecha).getTime() - new Date(b.Fecha).getTime();
    });

export default ListadoAvisos;

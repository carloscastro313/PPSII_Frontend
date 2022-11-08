import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import ExcelExport from "../../components/ExcelExport/ExcelExport";
import Layout from "../../components/Layout/Layout";
import ListaDinamica from "../../components/ListaDinamica/ListaDinamica";
import Spinner from "../../components/Spinner/Spinner";
import HTTP from "../../config/axios";
import useProtectedRoute from "../../hooks/useProtectedRoute";

const ListadoMateria = () => {
  const [materias, setMaterias] = useState([]);
  const [fetching, setFetching] = useState(true);

  const navigate = useNavigate();

  useProtectedRoute("administrador");

  const fetch = useCallback(() => {
    setFetching(true);
    HTTP.get("/administraciones/materia")
      .then(({ data }) => {
        // data = data.filter((d) => d.TipoUsuario === 2);
        setMaterias(data);
      })
      .finally(() => setFetching(false));
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const actions = [
    {
      name: "Modificar",
      onClickEvent: ({ Legajo }) => {
        navigate("/administrador/modificarmateria/" + Legajo);
      },
      cssClass: "bg-yellow-600 hover:bg-yellow-500 text-white",
    },
  ];

  return (
    <Layout>
      <Container>
        <div className="h-1/5 flex justify-between">
          <h1 className="mb-3 text-xl">Listado de materia</h1>
          <div className="h-[50px] flex gap-3">
            <ExcelExport filename="administradores" lista={materias} />
            <Button
              name="Crear usuario"
              onClickEvent={() => navigate("/administrador/crearmateria")}
            />
          </div>
        </div>
        <div className="h-3/4">
          <div className={`h-full overflow-auto ${!fetching && "bg-white"}`}>
            {materias.length > 0 && (
              <ListaDinamica
                actions={actions}
                listado={materiaFormat(materias)}
              />
            )}
            {materias.length === 0 && !fetching && (
              <div className="flex justify-center h-full">
                <h1 className="my-auto text-xl">No hay materias</h1>
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

function materiaFormat(usuarios = []) {
  return usuarios.map(({ Descripcion, Id }) => {
    return { Legajo: Id, Nombre: Descripcion };
  });
}

export default ListadoMateria;

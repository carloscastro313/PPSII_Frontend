import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import Container from "../../components/Container/Container";
import Layout from "../../components/Layout/Layout";
import ListaDinamica from "../../components/ListaDinamica/ListaDinamica";
import HTTP from "../../config/axios";
import useProtectedRoute from "../../hooks/useProtectedRoute";

const ListadoDocentes = () => {
  const [usuarios, setUsuarios] = useState([]);

  useProtectedRoute("administrador");

  const getAlumnos = useCallback(() => {
    HTTP.get("/usuarios/").then(({ data }) => {
      data = data.filter((d) => d.TipoUsuario === 3);
      setUsuarios(data);
    });
  }, []);

  useEffect(() => {
    getAlumnos();
  }, []);

  return (
    <Layout>
      <Container>
        <div className="h-1/5">
          <h1 className="mb-3 text-xl">Listado de usuarios</h1>
        </div>
        <div className="h-3/4">
          <div className="h-full bg-white overflow-auto">
            {usuarios.length > 0 && (
              <ListaDinamica actions={[]} listado={docenteFormat(usuarios)} />
            )}
            {usuarios.length === 0 && (
              <div className="flex justify-center h-full">
                <h1 className="my-auto text-xl">No hay docentes</h1>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Layout>
  );
};

function docenteFormat(usuarios = []) {
  return usuarios.map(({ Nombre, Apellido, Mail, Id }) => {
    return { Nombre, Apellido, Legajo: Id, Mail };
  });
}

export default ListadoDocentes;

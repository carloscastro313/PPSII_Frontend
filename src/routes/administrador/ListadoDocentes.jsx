import React, { useContext, useEffect, useState } from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import Layout from "../../components/Layout/Layout";
import ListaDinamica from "../../components/ListaDinamica/ListaDinamica";
import HTTP from "../../config/axios";
import ErrorContext from "../../contexts/errorPopup/ErrorContext";
import useProtectedRoute from "../../hooks/useProtectedRoute";

const ListadoDocentes = () => {
  const { showError } = useContext(ErrorContext);
  const [usuarios, setUsuarios] = useState([]);

  useProtectedRoute("administrador");

  const navigate = useNavigate();

  const fetch = useCallback(() => {
    HTTP.get("/docentes/").then(({ data }) => {
      data = data.filter((d) => d.TipoUsuario === 3);
      setUsuarios(data);
    });
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const actions = [
    {
      name: "Modificar",
      onClickEvent: ({ Legajo }) => {
        navigate("/administrador/modificardocente/" + Legajo);
      },
    },
    {
      name: "Eliminar",
      onClickEvent: ({ Legajo }) => {
        HTTP.delete("/usuarios/" + Legajo)
          .then(() => fetch())
          .catch(({ reponse: { data } }) => showError(data.msg));
      },
    },
  ];

  return (
    <Layout>
      <Container>
        <div className="h-1/5 flex justify-between">
          <h1 className="mb-3 text-xl">Listado de secretaria</h1>
          <div>
            <Button
              name="Crear usuario"
              onClickEvent={() => navigate("/administrador/creardocente")}
            />
          </div>
        </div>
        <div className="h-3/4">
          <div className="h-full bg-white overflow-auto">
            {usuarios.length > 0 && (
              <ListaDinamica
                actions={actions}
                listado={docenteFormat(usuarios)}
              />
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

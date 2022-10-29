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

const ListadoUsuario = () => {
  const { showError } = useContext(ErrorContext);
  const [usuarios, setUsuarios] = useState([]);

  useProtectedRoute("administrador");
  const navigate = useNavigate();

  const fetch = useCallback(() => {
    HTTP.get("/secretarias/").then(({ data }) => {
      data = data.filter((d) => d.TipoUsuario === 2);
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
        navigate("/administrador/modificarsecretaria/" + Legajo);
      },
      cssClass: "bg-yellow-600 hover:bg-yellow-500 text-white",
    },
    {
      name: "Eliminar",
      onClickEvent: ({ Legajo }) => {
        HTTP.delete("/usuarios/" + Legajo)
          .then(() => fetch())
          .catch(({ reponse: { data } }) => showError(data.msg));
      },
      cssClass: "bg-red-600 hover:bg-red-500 text-white",
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
              onClickEvent={() => navigate("/administrador/crearsecretaria")}
            />
          </div>
        </div>
        <div className="h-3/4">
          <div className="h-full bg-white overflow-auto">
            {usuarios.length > 0 && (
              <ListaDinamica
                actions={actions}
                listado={alumnoFormat(usuarios)}
              />
            )}
            {usuarios.length === 0 && (
              <div className="flex justify-center h-full">
                <h1 className="my-auto text-xl">No hay secretarias</h1>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Layout>
  );
};

function alumnoFormat(usuarios = []) {
  return usuarios.map(({ Nombre, Apellido, DNI, Mail, Id }) => {
    return { Nombre, Apellido, DNI, Mail, Legajo: Id };
  });
}

export default ListadoUsuario;

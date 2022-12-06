import React, { useContext, useEffect, useState } from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import ExcelExport from "../../components/ExcelExport/ExcelExport";
import Layout from "../../components/Layout/Layout";
import ListaDinamica from "../../components/ListaDinamica/ListaDinamica";
import LoadingModal from "../../components/LoadingModal/LoadingModal";
import Spinner from "../../components/Spinner/Spinner";
import HTTP from "../../config/axios";
import ErrorContext from "../../contexts/errorPopup/ErrorContext";
import useProtectedRoute from "../../hooks/useProtectedRoute";

const ListadoAdmin = () => {
  const { showError } = useContext(ErrorContext);

  const [usuarios, setUsuarios] = useState([]);
  const [fetching, setFetching] = useState(true);

  useProtectedRoute("administrador");

  const navigate = useNavigate();

  const fetch = useCallback(() => {
    setFetching(true);
    HTTP.get("/administraciones/")
      .then(({ data }) => {
        data = data.filter((d) => d.TipoUsuario === 1);
        setUsuarios(data);
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
        navigate("/administrador/modificaradministrador/" + Legajo);
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
      <LoadingModal show={fetching} />
      <Container>
        <div className="h-1/6 flex justify-between">
          <h1 className="my-auto text-xl text-white">
            Listado de administradores
          </h1>
          <div className="h-[50px] my-auto flex gap-3">
            <ExcelExport filename="materias" lista={alumnoFormat(usuarios)} />
            <Button
              name="Crear usuario"
              onClickEvent={() => navigate("/administrador/crearadministrador")}
              cssClass="bg-blue-600 hover:bg-blue-500 text-white p-3"
            />
          </div>
        </div>
        <div className="h-3/4 mt-3">
          <div className={`h-full overflow-auto ${!fetching && "bg-white"}`}>
            {usuarios.length > 0 && (
              <ListaDinamica
                actions={actions}
                listado={alumnoFormat(usuarios)}
              />
            )}
            {usuarios.length === 0 && !fetching && (
              <div className="flex justify-center h-full">
                <h1 className="my-auto text-xl">No hay administradores</h1>
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

function alumnoFormat(usuarios = []) {
  return usuarios.map(({ Nombre, Apellido, DNI, Mail, Id }) => {
    return { Nombre, Apellido, DNI, Mail, Legajo: Id };
  });
}

export default ListadoAdmin;

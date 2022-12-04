import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../components/Container/Container";
import ExcelExport from "../../components/ExcelExport/ExcelExport";
import Layout from "../../components/Layout/Layout";
import ListaDinamica from "../../components/ListaDinamica/ListaDinamica";
import HTTP from "../../config/axios";
import useProtectedRoute from "../../hooks/useProtectedRoute";

const ListadoAlumnos = () => {
  const [usuarios, setUsuarios] = useState([]);

  const navigate = useNavigate();
  useProtectedRoute("secretaria");

  const getAlumnos = useCallback(() => {
    HTTP.get("/usuarios/").then(({ data }) => {
      data = data.filter((d) => d.TipoUsuario === 4);
      setUsuarios(data);
    });
  }, []);

  useEffect(() => {
    getAlumnos();
  }, []);

  const actions = [
    {
      name: "Modificar",
      onClickEvent: ({ Legajo }) => {
        navigate("/secretaria/modificaralumno/" + Legajo);
      },
      cssClass: "bg-yellow-600 hover:bg-yellow-500 text-white",
    },
    {
      name: "Anotar a materias",
      onClickEvent: ({ Legajo, Nombre }) => {
        navigate("/secretaria/asignarmaterias/" + Legajo);
      },
      cssClass: "bg-green-600 hover:bg-green-500 text-white px-3",
    },
  ];

  return (
    <Layout>
      <Container>
        <div className="h-1/6 flex justify-between">
          <h1 className="my-auto text-xl text-white">Listado de alumnos</h1>
          <div className="h-[50px] my-auto flex gap-3">
            <ExcelExport filename="carreras" lista={alumnoFormat(usuarios)} />
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
                <h1 className="my-auto text-xl">No hay alumnos</h1>
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

export default ListadoAlumnos;

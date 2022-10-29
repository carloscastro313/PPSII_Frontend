import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CrearUsuario from "../administrador/CrearUsuario";
import ListadoAdmin from "../administrador/ListadoAdmin";
import ListadoCarrera from "../administrador/ListadoCarrera";
import ListadoDocentes from "../administrador/ListadoDocentes";
import ListadoUsuario from "../administrador/ListadoUsuario";
import Academico from "../alumno/Academico";
import Correlativas from "../alumno/Correlativas";
import Inscripcion from "../alumno/Inscripcion";
import NotasMaterias from "../alumno/NotasMaterias";
import Plan from "../alumno/Plan";
import Index from "../Index";
import Login from "../Login";
import AlumnosAsignados from "../profesor/AlumnosAsignados";
import CalificarAlumnos from "../profesor/CalificarAlumnos";
import MateriaAsignadas from "../profesor/MateriaAsignadas";
import ListadoAlumnos from "../secretaria/ListadoAlumnos";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/alumno/plan",
    element: <Plan />,
  },
  {
    path: "/alumno/correlativas/examen",
    element: <Correlativas tipo="examen" />,
  },
  {
    path: "/alumno/correlativas/cursada",
    element: <Correlativas tipo="cursada" />,
  },
  {
    path: "/alumno/inscripcion/materias",
    element: <Inscripcion tipo="materias" />,
  },
  {
    path: "/alumno/inscripcion/examen",
    element: <Inscripcion tipo="examen" />,
  },
  {
    path: "/alumno/notas",
    element: <NotasMaterias />,
  },
  {
    path: "/alumno/estado",
    element: <Academico />,
  },
  {
    path: "/profesor/materias",
    element: <MateriaAsignadas />,
  },
  {
    path: "/profesor/alumnos",
    element: <AlumnosAsignados />,
  },
  {
    path: "/profesor/calificar",
    element: <CalificarAlumnos />,
  },
  {
    path: "/secretaria/listaAlumnos",
    element: <ListadoAlumnos />,
  },
  {
    path: "/administrador/listasecretaria",
    element: <ListadoUsuario />,
  },
  {
    path: "/administrador/listadocente",
    element: <ListadoDocentes />,
  },
  {
    path: "/administrador/listadoadmin",
    element: <ListadoAdmin />,
  },
  {
    path: "/administrador/crearsecretaria",
    element: (
      <CrearUsuario
        TipoUsuario={2}
        title="Crear secretaria"
        redirect="/administrador/listasecretaria"
      />
    ),
  },
  {
    path: "/administrador/creardocente",
    element: (
      <CrearUsuario
        TipoUsuario={3}
        title="Crear docente"
        redirect="/administrador/listadocente"
      />
    ),
  },
  {
    path: "/administrador/crearadministrador",
    element: (
      <CrearUsuario
        TipoUsuario={1}
        title="Crear administrador"
        redirect="/administrador/listadoadmin"
      />
    ),
  },
  {
    path: "/administrador/modificarsecretaria/:id",
    element: (
      <CrearUsuario
        TipoUsuario={2}
        title="Crear secretaria"
        redirect="/administrador/listasecretaria"
        modificacion={true}
      />
    ),
  },
  {
    path: "/administrador/modificardocente/:id",
    element: (
      <CrearUsuario
        TipoUsuario={3}
        title="Crear docente"
        redirect="/administrador/listadocente"
        modificacion={true}
      />
    ),
  },
  {
    path: "/administrador/modificaradministrador/:id",
    element: (
      <CrearUsuario
        TipoUsuario={1}
        title="Crear administrador"
        redirect="/administrador/listadoadmin"
        modificacion={true}
      />
    ),
  },
  {
    path: "/administrador/listadocarreras",
    element: <ListadoCarrera />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;

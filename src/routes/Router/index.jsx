import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
    path: "/administrador/listaUsuarios",
    element: <ListadoUsuario />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;

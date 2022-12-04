import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AsignarMateria from "../administrador/AsignarMateria";
import CrearCronograma from "../administrador/CrearCronograma";
import CrearMateria from "../administrador/CrearMateria";
import CrearPlan from "../administrador/CrearPlan";
import CrearUsuario from "../administrador/CrearUsuario";
import GenerarInstancia from "../administrador/GenerarInstancia";
import ListadoAdmin from "../administrador/ListadoAdmin";
import ListadoCarrera from "../administrador/ListadoCarrera";
import ListadoDocentes from "../administrador/ListadoDocentes";
import ListadoMateria from "../administrador/ListadoMateria";
import ListadoPlan from "../administrador/ListadoPlan";
import ListadoUsuario from "../administrador/ListadoUsuario";
import Academico from "../alumno/Academico";
import Correlativas from "../alumno/Correlativas";
import FinalesAnotados from "../alumno/FinalesAnotados";
import Inscripcion from "../alumno/Inscripcion";
import NotasMaterias from "../alumno/NotasMaterias";
import Plan from "../alumno/Plan";
import CambiarContraseña from "../CambiarContraseña";
import Index from "../Index";
import Login from "../Login";
import AlumnoFinal from "../profesor/AlumnoFinal";
import AlumnosAsignados from "../profesor/AlumnosAsignados";
import MateriaAsignadas from "../profesor/MateriaAsignadas";
import VerFinales from "../profesor/VerFinales";
import AnotarMateria from "../secretaria/AnotarMateria";
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
    path: "/cambiarcontraseña",
    element: <CambiarContraseña />,
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
    path: "/alumno/inscripcion/examen",
    element: <Inscripcion tipo="examen" />,
  },
  {
    path: "/alumno/notas",
    element: <NotasMaterias />,
  },
  {
    path: "/alumno/finales",
    element: <FinalesAnotados />,
  },
  {
    path: "/alumno/estado",
    element: <Academico />,
  },
  {
    path: "/alumno/inscripcion/materias",
    element: <AnotarMateria isRoute={false} />,
  },
  {
    path: "/profesor/materias",
    element: <MateriaAsignadas />,
  },
  {
    path: "/profesor/alumnos/:id",
    element: <AlumnosAsignados />,
  },
  {
    path: "/profesor/calificar",
    element: <VerFinales />,
  },
  {
    path: "/profesor/calificar/:id",
    element: <AlumnoFinal />,
  },
  {
    path: "/secretaria/listaAlumnos",
    element: <ListadoAlumnos />,
  },
  {
    path: "/secretaria/crearalumno",
    element: <CrearUsuario TipoUsuario={4} title="Crear alumno" />,
  },
  {
    path: "/secretaria/modificaralumno/:id",
    element: (
      <CrearUsuario modificacion={true} redirect="/secretaria/listaAlumnos" />
    ),
  },
  {
    path: "/secretaria/asignarmaterias/:id",
    element: <AnotarMateria isRoute={true} />,
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
  {
    path: "/administrador/listadomateria",
    element: <ListadoMateria />,
  },
  {
    path: "/administrador/crearmateria",
    element: <CrearMateria modificacion={false} />,
  },
  {
    path: "/administrador/modificarmateria/:id",
    element: <CrearMateria modificacion={true} />,
  },
  {
    path: "/administrador/crearplan/:id",
    element: <CrearPlan />,
  },
  {
    path: "/administrador/crearplan/:id",
    element: <CrearPlan />,
  },
  {
    path: "/administrador/listadoplan/:id",
    element: <ListadoPlan />,
  },
  {
    path: "/administrador/cronograma/:id",
    element: <CrearCronograma modificacion={false} />,
  },
  {
    path: "/administrador/cronograma/modificacion/:id",
    element: <CrearCronograma modificacion={true} />,
  },
  {
    path: "/administrador/cronograma/asignarDocente/:id",
    element: <AsignarMateria />,
  },
  {
    path: "/administrador/generarInstancia/final",
    element: <GenerarInstancia />,
  },
  {
    path: "/administrador/generarInstancia/materia",
    element: <GenerarInstancia materia={true} />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;

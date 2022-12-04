// AUTH

export const LOADING = "LOADING";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const ERROR = "ERROR";

// ERROR

export const SHOW = "SHOW";
export const CLOSE = "CLOSE";

// MENU BUTTONS
export const menuBtns = {
  alumno: [
    {
      name: "Plan de estudio",
      route: "/alumno/plan",
    },
    {
      name: "Estado academico",
      route: "/alumno/estado",
    },
    {
      name: "Notas de materias",
      route: "/alumno/notas",
    },
    {
      name: "Inscripcion a materias",
      route: "/alumno/inscripcion/materias",
    },
    {
      name: "Inscripcion a examenes",
      route: "/alumno/inscripcion/examen",
    },
    {
      name: "Finales anotados",
      route: "/alumno/finales",
    },
  ],
  docente: [
    {
      name: "Mis materias",
      route: "/profesor/materias",
    },
    {
      name: "Ver finales",
      route: "/profesor/calificar",
    },
  ],
  secretaria: [
    {
      name: "Listado alumnos",
      route: "/secretaria/listaAlumnos",
    },
    {
      name: "Crear alumno",
      route: "/secretaria/crearalumno",
    },
  ],
  administrador: [
    {
      name: "Listado secretaria",
      route: "/administrador/listasecretaria",
    },
    {
      name: "Listado docente",
      route: "/administrador/listadocente",
    },
    {
      name: "Listado administrador",
      route: "/administrador/listadoadmin",
    },
    {
      name: "Listado carreras",
      route: "/administrador/listadocarreras",
    },
    {
      name: "Listado materias",
      route: "/administrador/listadomateria",
    },
    {
      name: "Instancia inscripcion a final",
      route: "/administrador/generarInstancia/final",
    },
    {
      name: "Instancia inscripcion a materias",
      route: "/administrador/generarInstancia/materia",
    },
  ],
};

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
      name: "Correlativas a cursar",
      route: "/alumno/correlativas/cursada",
    },
    {
      name: "Correlativas a rendir",
      route: "/alumno/correlativas/examen",
    },
    {
      name: "Inscripcion a materias",
      route: "/alumno/inscripcion/materias",
    },
    {
      name: "Inscripcion a examenes",
      route: "/alumno/inscripcion/examen",
    },
  ],
  profesor: [
    {
      name: "Mis materias",
      route: "/profesor/materias",
    },
    {
      name: "Mis alumnos",
      route: "/profesor/alumnos",
    },
    {
      name: "Calificar alumnos",
      route: "/profesor/calificar",
    },
  ],
  secretaria: [
    {
      name: "Listado alumnos",
      route: "/secretaria/listaAlumnos",
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
  ],
};

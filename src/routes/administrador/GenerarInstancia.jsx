import React, { useCallback, useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import Input from "../../components/Input/Input";
import Layout from "../../components/Layout/Layout";
import LoadingModal from "../../components/LoadingModal/LoadingModal";
import HTTP from "../../config/axios";
import ErrorContext from "../../contexts/errorPopup/ErrorContext";
import useProtectedRoute from "../../hooks/useProtectedRoute";

const GenerarInstancia = ({ materia = false }) => {
  useProtectedRoute("administrador");
  const { showError } = useContext(ErrorContext);

  const [FechaInicio, setFechaInicio] = useState("");
  const [FechaFinal, setFechaFinal] = useState("");
  const [primeraSemana, setPrimeraSemana] = useState("");
  const [segundaSemana, setSegundaSemana] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkInstancia = useCallback(async () => {
    setLoading(true);
    const res = await HTTP.get("/administraciones/instanciaInscripcionActivas");

    if (res.data.length > 0) {
      navigate("/");
      showError("En este momento ya existe una instancia de inscripcion");
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    checkInstancia();
  }, []);

  const crearInstancia = () => {
    if (FechaFinal == "" || FechaInicio == "") {
      showError("Todos los campos son obligatorios");
      return;
    }

    const inicio = new Date(FechaInicio);
    const final = new Date(FechaFinal);

    if (
      inicio.getTime() > final.getTime() ||
      inicio.getTime() < new Date().getTime() ||
      final.getTime() < new Date().getTime()
    ) {
      showError("Las fecha de inicio debe ser menor a la fecha final");
      return;
    }

    if (materia) {
      HTTP.post("/administraciones/instanciaInscripcion", {
        FechaFinal,
        FechaInicio,
        Cuatrimestre: 0,
        Año: inicio.getFullYear,
        IdTipo: 2,
      })
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          showError(error.response.data.msg);
        });
    } else {
      if (primeraSemana == "" || segundaSemana == "") {
        showError("Todos los campos son obligatorios");
        return;
      }

      const primera = new Date(primeraSemana);
      const segunda = new Date(segundaSemana);
      if (
        inicio.getTime() > primera.getTime() ||
        final.getTime() > segunda.getTime() ||
        inicio.getTime() > segunda.getTime() ||
        final.getTime() > segunda.getTime() ||
        primera.getTime() > segunda.getTime()
      ) {
        showError("Las fechas ingresadas no son validas");
        return;
      }

      primera.setDate(primera.getDate() + 6);

      if (primera >= segunda) {
        showError("La primera semana debe ser menor a la segunda semana");
        return;
      }

      HTTP.post("/administraciones/instanciaFinal", {
        newInstanciaInscripcion: {
          FechaFinal,
          FechaInicio,
          Cuatrimestre: 0,
          Año: inicio.getFullYear(),
          IdTipo: 1,
        },
        primeraSemana,
        segundaSemana,
      })
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          showError(error.response.data.msg);
        });
    }
  };

  return (
    <Layout>
      <LoadingModal show={loading} />
      <Container cssClass="w-3/4 lg:w-1/4 min-h-[200px] bg-blue-500">
        <h1 className="text-2xl text-center mb-3">
          {!materia
            ? "Generar instancias de final"
            : "Generar instancias de materias"}
        </h1>
        <div className="flex flex-col gap-3">
          <Input
            label="Inicio de instancia"
            id="FechaInicio"
            type="Date"
            value={FechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
          <Input
            label="Finalizacion de instancia"
            id="FechaInicio"
            type="Date"
            value={FechaFinal}
            onChange={(e) => setFechaFinal(e.target.value)}
          />
          {!materia && (
            <>
              <Input
                label="Primera semana de examenes"
                id="FechaInicio"
                type="Date"
                value={primeraSemana}
                onChange={(e) => setPrimeraSemana(e.target.value)}
              />
              <Input
                label="Segunda semana de examenes"
                id="FechaInicio"
                type="Date"
                value={segundaSemana}
                onChange={(e) => setSegundaSemana(e.target.value)}
              />
            </>
          )}

          <Button name="Generar instancias" onClickEvent={crearInstancia} />
        </div>
      </Container>
    </Layout>
  );
};

export default GenerarInstancia;

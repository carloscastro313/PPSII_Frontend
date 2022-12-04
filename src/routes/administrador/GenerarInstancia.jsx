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
    const res = await HTTP.get(
      "/administraciones/checkCanCreateInstancia/" + (materia ? "2" : "1")
    );

    if (!res.data) {
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

    debugger;
    const inicio = getDate(FechaInicio);
    const final = getDate(FechaFinal);
    const actual = new Date();
    actual.setHours(0, 0, 0, 0);
    inicio.setHours(0, 0, 0, 0);
    final.setHours(0, 0, 0, 0);

    if (inicio.getTime() < actual.getTime() || final < actual.getTime()) {
      showError("Las fechas deben ser mayor al la fecha actual");
      return;
    }

    if (inicio.getTime() > final.getTime()) {
      showError("Las fecha de inicio debe ser menor a la fecha final");
      return;
    }

    if (materia) {
      setLoading(true);
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
        })
        .finally(() => setLoading(false));
    } else {
      if (primeraSemana == "" || segundaSemana == "") {
        showError("Todos los campos son obligatorios");
        return;
      }

      const primera = getDate(primeraSemana);
      const segunda = getDate(segundaSemana);
      primera.setHours(0, 0, 0, 0);
      segunda.setHours(0, 0, 0, 0);

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

      setLoading(true);
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
        })
        .finally(() => setLoading(true));
    }
  };

  return (
    <Layout>
      <LoadingModal show={loading} />
      <Container cssClass="w-3/4 lg:w-1/4 min-h-[200px] bg-primary">
        <h1 className="text-xl text-center mb-3 text-white">
          {!materia
            ? "Generar instancia de inscripción a final"
            : "Generar instancia de inscripción a materias"}
        </h1>
        <div className="flex flex-col gap-4 mt-5">
          <Input
            label="Inicio inscripción"
            id="FechaInicio"
            type="Date"
            value={FechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
          <Input
            label="Finalización inscripción"
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

          <Button
            name="Generar instancia de inscripción"
            onClickEvent={crearInstancia}
          />
        </div>
      </Container>
    </Layout>
  );
};

const getDate = (dateStr) => {
  var dateArray = dateStr.split("-");
  var year = dateArray[0];
  var month = parseInt(dateArray[1], 10) - 1;
  var date = dateArray[2];

  return new Date(year, month, date);
};

export default GenerarInstancia;

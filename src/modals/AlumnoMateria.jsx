import React, { useEffect, useState } from "react";
import { BsX } from "react-icons/bs";
import Button from "../components/Button/Button";
import Container from "../components/Container/Container";
import IconButton from "../components/IconButton/IconButton";
import Input from "../components/Input/Input";
import Modal from "../components/Modal/Modal";

const labels = {
  NotaPrimerParcial: "Primer parcial",
  NotaRecuperatorioPrimerParcial: "1° Recuperatorio Primer parcial",
  NotaRecuperatorioPrimerParcial2: "2° Recuperatorio primer parcial",
  NotaSegundoParcial: "Segunda parcial",
  NotaRecuperatorioSegundoParcial: "1° Recuperatorio segunda parcial",
  NotaRecuperatorioSegundoParcial2: "2° Recuperatorio segunda parcial",
};

const AlumnoMateria = ({
  show = false,
  closeModal,
  AlumnoMateria,
  submit,
  desaprobarAlumno,
}) => {
  const [Notas, setNotas] = useState(null);
  const [aprobrarCursada, setAprobrarCursada] = useState(false);
  const [desaprobar, setDesaprobar] = useState(false);

  useEffect(() => {
    if (show) {
      let {
        NotaPrimerParcial,
        NotaRecuperatorioPrimerParcial,
        NotaRecuperatorioPrimerParcial2,
        NotaSegundoParcial,
        NotaRecuperatorioSegundoParcial,
        NotaRecuperatorioSegundoParcial2,
      } = AlumnoMateria.AlumnoMateriaDivision;
      setNotas({
        NotaPrimerParcial,
        NotaRecuperatorioPrimerParcial,
        NotaRecuperatorioPrimerParcial2,
        NotaSegundoParcial,
        NotaRecuperatorioSegundoParcial,
        NotaRecuperatorioSegundoParcial2,
      });
      setAprobrarCursada(false);
      setDesaprobar(false);
    }
  }, [show]);

  const handlerSubmit = () => {
    let aux = { ...Notas };

    Object.keys(aux).forEach((key) => {
      if (aux[key] === "") aux[key] = 0;
    });

    if (!desaprobar) {
      submit(aux, aprobrarCursada);
    } else {
      desaprobarAlumno(aux);
    }
  };
  return (
    <Modal show={show}>
      <Container cssClass="w-3/4 lg:w-1/4 min-h-[200px] bg-blue-400">
        <div className="flex justify-between m-auto p-2">
          <span></span>
          <h1 className="text-center">Calificar alumno</h1>
          <div>
            <IconButton onClickEvent={() => closeModal()}>
              <BsX />
            </IconButton>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {Notas && (
            <>
              {Object.keys(Notas).map((key) => (
                <Input
                  value={Notas[key]}
                  onChange={(e) => {
                    const aux = e.target.value;
                    let notasAux = { ...Notas };

                    if (
                      aux !== "" &&
                      (0 > parseInt(aux) || 10 < parseInt(aux))
                    ) {
                      notasAux[key] = 0;

                      setNotas(notasAux);
                      return;
                    }

                    if (aux === "") {
                      notasAux[key] = aux;

                      setNotas(notasAux);
                      return;
                    }

                    notasAux[key] = parseInt(aux);

                    setNotas(notasAux);
                  }}
                  key={key}
                  label={labels[key]}
                />
              ))}
              {checkAprobado(Notas) && (
                <div className="flex gap-3 px-3">
                  <label htmlFor="aprobarCursada">Aprobar cursada</label>
                  <input
                    id="aprobarCursada"
                    type="checkbox"
                    checked={aprobrarCursada}
                    onChange={(e) => setAprobrarCursada(e.target.checked)}
                  />
                </div>
              )}
              {checkDesaprobado(Notas) && (
                <div className="flex gap-3 px-3">
                  <label htmlFor="desaprobado">Desaprobar cursada</label>
                  <input
                    id="desaprobado"
                    type="checkbox"
                    checked={desaprobar}
                    onChange={(e) => setDesaprobar(e.target.checked)}
                  />
                </div>
              )}
            </>
          )}
          <Button
            name="Actualizar notas"
            cssClass="bg-yellow-600 hover:bg-yellow-400 text-white"
            onClickEvent={handlerSubmit}
          />
        </div>
      </Container>
    </Modal>
  );
};

const checkAprobado = (alumnoMateria) => {
  var primerParcial = [
    alumnoMateria.NotaPrimerParcial,
    alumnoMateria.NotaRecuperatorioPrimerParcial,
    alumnoMateria.NotaRecuperatorioPrimerParcial2,
  ];

  var segundoParcial = [
    alumnoMateria.NotaSegundoParcial,
    alumnoMateria.NotaRecuperatorioSegundoParcial,
    alumnoMateria.NotaRecuperatorioSegundoParcial2,
  ];

  var notaMasAltaPrimerParcial = 0;
  var notaMasAltaSegundoParcial = 0;

  for (let i = 0; i < primerParcial.length; i++) {
    if (primerParcial[i] >= notaMasAltaPrimerParcial) {
      notaMasAltaPrimerParcial = primerParcial[i];
    }
  }

  for (let i = 0; i < segundoParcial.length; i++) {
    if (segundoParcial[i] >= notaMasAltaSegundoParcial) {
      notaMasAltaSegundoParcial = segundoParcial[i];
    }
  }

  return notaMasAltaPrimerParcial >= 4 && notaMasAltaSegundoParcial >= 4;
};

const checkDesaprobado = (alumnoMateria) => {
  var primerParcial = [
    alumnoMateria.NotaPrimerParcial,
    alumnoMateria.NotaRecuperatorioPrimerParcial,
    alumnoMateria.NotaRecuperatorioPrimerParcial2,
  ];

  var segundoParcial = [
    alumnoMateria.NotaSegundoParcial,
    alumnoMateria.NotaRecuperatorioSegundoParcial,
    alumnoMateria.NotaRecuperatorioSegundoParcial2,
  ];

  var notaMasAltaPrimerParcial = 0;
  var notaMasAltaSegundoParcial = 0;

  for (let i = 0; i < primerParcial.length; i++) {
    if (primerParcial[i] >= notaMasAltaPrimerParcial) {
      notaMasAltaPrimerParcial = primerParcial[i];
    }
  }

  for (let i = 0; i < segundoParcial.length; i++) {
    if (segundoParcial[i] >= notaMasAltaSegundoParcial) {
      notaMasAltaSegundoParcial = segundoParcial[i];
    }
  }

  return (
    notaMasAltaPrimerParcial >= 1 &&
    notaMasAltaPrimerParcial <= 2 &&
    notaMasAltaSegundoParcial >= 1 &&
    notaMasAltaSegundoParcial <= 2
  );
};

export default AlumnoMateria;

import React from "react";
import Button from "../components/Button/Button";
import Container from "../components/Container/Container";
import Modal from "../components/Modal/Modal";

const CronogramaDetalle = ({
  show,
  closeModal,
  materiaCronograma,
  handlerUnselect,
}) => {
  return (
    <Modal show={show}>
      <Container cssClass="w-3/4 lg:w-1/2 min-h-[200px] bg-blue-500">
        <h1 className="text-center p-2 text-xl mb-3">Cronograma</h1>
        <div className="flex flex-col my-5">
          {materiaCronograma?.cronograma.map(
            ({ IdTurno, IdFranjaHoraria, Dia }) => (
              <div className="flex flex-row justify-between w-full">
                <p>Turno: {getTurno(IdTurno)}</p>
                <p>Dia: {Dia}</p>
                <p>Horario: {getHorario(IdFranjaHoraria)}</p>
              </div>
            )
          )}
        </div>
        <div className="flex justify-center gap-3">
          <Button name="Cerrar" onClickEvent={() => closeModal()} />
          <Button
            name="Borrar"
            cssClass="bg-red-600 hover:bg-red-400 text-white"
            onClickEvent={() => {
              handlerUnselect(materiaCronograma, false);
              closeModal();
            }}
          />
        </div>
      </Container>
    </Modal>
  );
};

const getTurno = (id) => {
  switch (id) {
    case 1:
      return "Mañana";
    case 2:
      return "Tarde";
    case 3:
      return "Noche";
    default:
      return "-";
  }
};

const getHorario = (id) => {
  switch (parseInt(id)) {
    case 1:
      return "Primera hora";
    case 2:
      return "Segunda hora";
    case 3:
      return "Bloque completo";
    default:
      return "-";
  }
};

export default CronogramaDetalle;

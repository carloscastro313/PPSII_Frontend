import React from "react";
import { BsX } from "react-icons/bs";
import Container from "../components/Container/Container";
import IconButton from "../components/IconButton/IconButton";
import Modal from "../components/Modal/Modal";

const ListaCronograma = ({
  closeModal,
  show,
  selectCrono,
  cronogramas = [],
}) => {
  return (
    <Modal show={show}>
      <Container cssClass="w-3/4 lg:w-1/4 min-h-[200px] bg-primary">
        <div className="flex justify-between m-auto p-2">
          <span></span>
          <h1 className="text-center text-white ml-10 my-auto">Cronograma</h1>
          <div>
            <IconButton onClickEvent={() => closeModal(false)}>
              <BsX />
            </IconButton>
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-3">
          <div className="bg-white h-[500px]">
            <p className="text-center p-3 bg-gray-500 text-white">Divisiones</p>
            <div className="overflow-auto">
              {cronogramas.map((value, index) => (
                <ItemCrono
                  {...value}
                  key={index}
                  onClick={() => selectCrono(value)}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Modal>
  );
};

const ItemCrono = ({
  IdFranjaHoraria,
  Dia,
  IdTurno,
  MateriaDivision: { Division },
  onClick,
}) => (
  <div
    className="flex flex-col p-3 border-b-gray-400 border-b-2 hover:bg-gray-300 hover:cursor-pointer"
    onClick={onClick}
  >
    <p>Division: {Division}</p>
    <p>Turno: {getTurno(IdTurno)}</p>
    <p>Franja horaria: {getHorario(IdFranjaHoraria)}</p>
    <p>Dia: {Dia}</p>
  </div>
);

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
  switch (id) {
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

export default ListaCronograma;

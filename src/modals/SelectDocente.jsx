import React from "react";
import { BsX } from "react-icons/bs";
import Container from "../components/Container/Container";
import IconButton from "../components/IconButton/IconButton";
import Modal from "../components/Modal/Modal";

const SelectDocente = ({
  show = false,
  closeModal,
  docentes = [],
  onSelect,
}) => {
  return (
    <Modal show={show}>
      <Container cssClass="w-3/4 lg:w-1/4 min-h-[200px] bg-blue-500">
        <div className="flex justify-between m-auto py-3">
          <h1 className="my-auto text-xl">Asignar docente a materia</h1>
          <div>
            <IconButton onClickEvent={closeModal}>
              <BsX className="text-3xl" />
            </IconButton>
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-4">
          <div className="bg-white h-[500px]">
            <p className="text-center p-3 bg-blue-400">Docentes</p>
            <div className="overflow-auto">
              {docentes.map((value) => (
                <div
                  className="flex flex-col p-3 border-b-gray-400 border-b-2 hover:bg-slate-400 hover:cursor-pointer"
                  onClick={() => {
                    onSelect(value);
                  }}
                  key={value.Id}
                >
                  <p className="text-center">
                    {`${value.Nombre} ${value.Apellido}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Modal>
  );
};

export default SelectDocente;

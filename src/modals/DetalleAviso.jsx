import React from "react";
import { BsX } from "react-icons/bs";
import Container from "../components/Container/Container";
import IconButton from "../components/IconButton/IconButton";
import Modal from "../components/Modal/Modal";

const DetalleAviso = ({ show = false, closeModal, aviso }) => {
  const { Titulo, Nombre, Mail, Fecha, Mensaje } = aviso;
  return (
    <Modal show={show}>
      <Container cssClass="w-3/4 lg:w-1/4 min-h-[200px] bg-primary">
        <div className="flex justify-between m-auto py-3">
          <h1 className="my-auto text-xl text-white">Detalle aviso</h1>
          <div>
            <IconButton onClickEvent={closeModal}>
              <BsX />
            </IconButton>
          </div>
        </div>
        <div className="flex flex-col bg-white p-3">
          <p>Enviado por: {Nombre}</p>
          <p>Email: {Mail}</p>
          <p>Asunto: {Titulo}</p>
          <p>Fecha: {Fecha}</p>
          <div className="flex flex-col mt-3 p-3">
            <p>Mensaje:</p>
            <p className="h-80 overflow-auto mt-3">{Mensaje}</p>
          </div>
        </div>
      </Container>
    </Modal>
  );
};

export default DetalleAviso;

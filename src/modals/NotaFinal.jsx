import React, { useContext } from "react";
import { useState } from "react";
import { BsX } from "react-icons/bs";
import Button from "../components/Button/Button";
import Container from "../components/Container/Container";
import IconButton from "../components/IconButton/IconButton";
import Input from "../components/Input/Input";
import Modal from "../components/Modal/Modal";
import ErrorContext from "../contexts/errorPopup/ErrorContext";

const NotaFinal = ({ show, closeModal, submit }) => {
  const { showError } = useContext(ErrorContext);

  const [nota, setnota] = useState("");

  const handlerSubmit = () => {
    if (nota === "") {
      closeModal();
      showError("La nota es obligatoria");
      return;
    }

    if (nota < 2 || nota > 10) {
      closeModal();
      showError("La nota ingresada no es valida");
      return;
    }

    submit(nota);
  };

  return (
    <Modal show={show}>
      <Container cssClass="w-3/4 lg:w-1/4 min-h-[200px] bg-primary">
        <div className="flex justify-between m-auto p-2">
          <span></span>
          <h1 className="text-center text-white ml-9">Calificar alumno</h1>
          <div>
            <IconButton onClickEvent={() => closeModal()}>
              <BsX />
            </IconButton>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Input
            value={nota}
            onChange={(e) => {
              setnota(parseInt(e.target.value));
            }}
            label={"Nota final"}
          />
        </div>
        <div className="flex flex-col mt-4">
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

export default NotaFinal;

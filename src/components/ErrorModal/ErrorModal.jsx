import React from "react";
import { useContext } from "react";
import ErrorContext from "../../contexts/errorPopup/ErrorContext";
import Button from "../Button/Button";
import Container from "../Container/Container";
import Modal from "../Modal/Modal";

const ErrorModal = () => {
  const { show, closeError, msg } = useContext(ErrorContext);

  return (
    <Modal show={show}>
      <Container cssClass="w-[300px] bg-red-300">
        <div className="flex flex-col gap-5">
          <h1 className="text-xl text-center">Error</h1>
          <div className="max-h-[300px] overflow-x-auto">
            <p>{msg}</p>
          </div>
          <div className="flex justify-center content-center">
            <Button name="Cerrar" onClickEvent={closeError} />
          </div>
        </div>
      </Container>
    </Modal>
  );
};

export default ErrorModal;

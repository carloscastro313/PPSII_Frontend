import React from "react";
import Button from "../components/Button/Button";
import Container from "../components/Container/Container";
import Modal from "../components/Modal/Modal";

const Confirmacion = ({
  show = false,
  accept,
  deny,
  titulo = "",
  mensaje = "",
  btnAccept = "Aceptar",
  btnDeny = "Rechazar",
}) => {
  return (
    <Modal show={show}>
      <Container cssClass="w-3/4 lg:w-1/4 min-h-[200px] bg-blue-500">
        <h1 className="my-auto text-xl text-center p-4">{titulo}</h1>
        <p className="p-4 text-center">{mensaje}</p>
        <div className="flex justify-around mt-3 gap-3">
          <Button
            onClickEvent={accept}
            name={btnAccept}
            cssClass="bg-green-600 hover:bg-green-500 text-white"
          />
          <Button
            onClickEvent={deny}
            name={btnDeny}
            cssClass="bg-red-600 hover:bg-red-400 text-white"
          />
        </div>
      </Container>
    </Modal>
  );
};

export default Confirmacion;

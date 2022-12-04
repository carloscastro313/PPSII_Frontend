import React from "react";
import { BsX } from "react-icons/bs";
import Container from "../components/Container/Container";
import IconButton from "../components/IconButton/IconButton";
import Modal from "../components/Modal/Modal";

const DetalleNota = ({ show = false, closeModal, notas }) => {
  return (
    <Modal show={show}>
      <Container cssClass="w-3/4 lg:w-1/4 min-h-[200px] bg-blue-500">
        <div className="flex justify-between m-auto py-3">
          <h1 className="my-auto text-xl">Detalle notas</h1>
          <div>
            <IconButton onClickEvent={closeModal}>
              <BsX className="text-3xl" />
            </IconButton>
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-4 bg-white p-3">
          {notas && (
            <>
              <p>
                Primer parcial:{" "}
                <span className="font-bold">{notas.NotaPrimerParcial}</span>
              </p>
              <p>
                1° Recuperatorio primer parcial:{" "}
                <span className="font-bold">
                  {notas.NotaRecuperatorioPrimerParcial}
                </span>
              </p>
              <p>
                2° Recuperatorio primer parcial:{" "}
                <span className="font-bold">
                  {notas.NotaRecuperatorioPrimerParcial2}
                </span>
              </p>
              <p>
                Segundo parcial:{" "}
                <span className="font-bold">{notas.NotaSegundoParcial}</span>
              </p>
              <p>
                1° Recuperatorio segundo parcial:{" "}
                <span className="font-bold">
                  {notas.NotaRecuperatorioSegundoParcial}
                </span>
              </p>
              <p>
                2° Recuperatorio segundo parcial:{" "}
                <span className="font-bold">
                  {notas.NotaRecuperatorioSegundoParcial2}
                </span>
              </p>
              <p className="mt-3">
                Nota final: <span className="font-bold">{notas.NotaFinal}</span>
              </p>
            </>
          )}
        </div>
      </Container>
    </Modal>
  );
};
export default DetalleNota;

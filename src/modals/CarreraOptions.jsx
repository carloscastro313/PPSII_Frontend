import React from "react";
import { BsX } from "react-icons/bs";
import Button from "../components/Button/Button";
import Container from "../components/Container/Container";
import IconButton from "../components/IconButton/IconButton";
import Modal from "../components/Modal/Modal";

const CarreraOptions = ({
  carrera = null,
  show = false,
  closeModal,
  ModificarMateria,
  GenerarPlan,
  VerPlanes,
  CrearCronograma,
}) => {
  return (
    <Modal show={show}>
      <Container cssClass="w-3/4 lg:w-1/4 min-h-[200px] bg-blue-500">
        <div className="flex justify-between m-auto p-2">
          <span></span>
          <h1 className="text-center">Crear carrera</h1>
          <div>
            <IconButton onClickEvent={closeModal}>
              <BsX />
            </IconButton>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            name="Modificar carrera"
            cssClass="bg-yellow-600 hover:bg-yellow-400 text-white"
            onClickEvent={() => {
              ModificarMateria();
            }}
          />
          <Button
            name={
              carrera?.PlanActual === ""
                ? "Crear plan de estudio"
                : "Cambiar plan de estudio"
            }
            cssClass="bg-gray-600 hover:bg-gray-400 text-white"
            onClickEvent={() => GenerarPlan()}
          />
          {carrera?.PlanActual !== "" && (
            <>
              <Button
                name="Ver planes"
                cssClass="bg-green-600 hover:bg-green-500 text-white"
                onClickEvent={() => VerPlanes()}
              />
              <Button
                name="Cronograma de carrera"
                onClickEvent={() => CrearCronograma()}
              />
            </>
          )}

          <Button
            name="Baja"
            cssClass="bg-red-600 hover:bg-red-300 text-white"
          />
        </div>
      </Container>
    </Modal>
  );
};

export default CarreraOptions;

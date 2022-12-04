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
  ModificarCronograma,
  AsignarDocente,
}) => {
  return (
    <Modal show={show}>
      <Container cssClass="w-3/4 lg:w-1/4 min-h-[200px] bg-primary">
        <div className="flex justify-between m-auto p-2">
          <span></span>
          <h1 className="text-center text-white ml-4 my-auto">Opciones</h1>
          <div>
            <IconButton onClickEvent={closeModal}>
              <BsX />
            </IconButton>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-3 bg-white p-3">
          <Button
            name="Modificar carrera"
            cssClass="bg-gray-500 hover:bg-gray-400 text-white"
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
            cssClass="bg-gray-500 hover:bg-gray-400 text-white"
            onClickEvent={() => GenerarPlan()}
          />
          {carrera?.PlanActual !== "" && (
            <>
              <Button
                name="Ver planes"
                cssClass="bg-gray-500 hover:bg-gray-400 text-white"
                onClickEvent={() => VerPlanes()}
              />
              <Button
                name="Cronograma de carrera"
                onClickEvent={() => CrearCronograma()}
                cssClass="bg-gray-500 hover:bg-gray-400 text-white"
              />
              <Button
                name="Modificar cronograma"
                cssClass="bg-gray-500 hover:bg-gray-400 text-white"
                onClickEvent={() => ModificarCronograma()}
              />
              <Button
                name="Asignar docente a materia"
                cssClass="bg-gray-500 hover:bg-gray-400 text-white"
                onClickEvent={() => AsignarDocente()}
              />
            </>
          )}
        </div>
      </Container>
    </Modal>
  );
};

export default CarreraOptions;

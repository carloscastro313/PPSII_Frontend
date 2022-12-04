import React, { useContext, useEffect, useState } from "react";
import { BsX } from "react-icons/bs";
import Button from "../components/Button/Button";
import Container from "../components/Container/Container";
import IconButton from "../components/IconButton/IconButton";
import Input from "../components/Input/Input";
import Modal from "../components/Modal/Modal";
import ErrorContext from "../contexts/errorPopup/ErrorContext";

const GenerarTurno = ({
  closeModal,
  show,
  action,
  modificar = false,
  turnos = [],
  franjaHoraria = [],
}) => {
  const { showError } = useContext(ErrorContext);

  const [IdTurno, setIdTurno] = useState("-1");
  const [IdFranjaHoraria, setIdFranjaHoraria] = useState("-1");
  const [Dia, setDia] = useState("-1");
  const [Division, setNombre] = useState("");

  useEffect(() => {
    if (modificar) {
      setNombre("-1");
    } else {
      setNombre("");
    }
  }, [modificar]);

  const handleSubmit = () => {
    if (
      IdTurno === "-1" ||
      IdFranjaHoraria === "-1" ||
      Dia === "-1" ||
      Division === "" ||
      Division.length > 5
    ) {
      closeModal(false);
      showError("Los campos ingresados esta incompletos");
      return;
    }
    const data = {
      IdTurno,
      IdFranjaHoraria,
      Dia,
    };
    if (!modificar) data.Division = Division;

    action(data);

    closeModal(false);
  };

  return (
    <Modal show={show}>
      <Container cssClass="w-3/4 lg:w-1/4 min-h-[200px] bg-primary">
        <div className="flex justify-between m-auto p-2">
          <span></span>
          <h1 className="text-center text-white ml-4 my-auto">Cronograma</h1>
          <div>
            <IconButton onClickEvent={() => closeModal(false)}>
              <BsX />
            </IconButton>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col px-3">
            <p className="text-white text-lg pl-1">Turnos</p>
            <select
              className="p-2 rounded"
              onChange={(e) => setIdTurno(e.target.value)}
            >
              <option value="-1"> - </option>
              {turnos.map((value) => (
                <option value={value.Id} key={value.Id}>
                  {value.Descripcion}
                </option>
              ))}
            </select>
          </div>
          {!modificar && (
            <Input
              id="nombre"
              onChange={(e) => setNombre(e.target.value)}
              value={Division}
              label="Division"
            />
          )}
          <div className="flex flex-col px-3">
            <p className="text-white text-lg pl-1">Franja horaria</p>
            <select
              className="p-2 rounded"
              onChange={(e) => setIdFranjaHoraria(e.target.value)}
            >
              <option value="-1"> - </option>
              {franjaHoraria.map((value) => (
                <option value={value.Id} key={value.Id}>
                  {value.Descripcion}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col px-3">
            <p className="text-white text-lg pl-1">Dia</p>
            <select
              className="p-2 rounded"
              onChange={(e) => setDia(e.target.value)}
            >
              <option value="-1"> - </option>
              <option value="Lunes">Lunes</option>
              <option value="Martes">Martes</option>
              <option value="Miercoles">Miercoles</option>
              <option value="Jueves">Jueves</option>
              <option value="Viernes">Viernes</option>
              <option value="Sabado">Sabado</option>
            </select>
          </div>

          <Button name="Agregar" onClickEvent={handleSubmit} />
        </div>
      </Container>
    </Modal>
  );
};

export default GenerarTurno;

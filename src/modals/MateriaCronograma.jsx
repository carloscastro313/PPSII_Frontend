import React, { useCallback, useContext, useEffect, useState } from "react";
import { BsX } from "react-icons/bs";
import Button from "../components/Button/Button";
import Container from "../components/Container/Container";
import IconButton from "../components/IconButton/IconButton";
import Input from "../components/Input/Input";
import Modal from "../components/Modal/Modal";
import Spinner from "../components/Spinner/Spinner";
import HTTP from "../config/axios";
import ErrorContext from "../contexts/errorPopup/ErrorContext";

const MateriaCronograma = ({
  show = false,
  materia,
  closeModal,
  addMateria,
  seleccionados = [],
  cuatrimestre,
}) => {
  const { showError } = useContext(ErrorContext);

  const [fetching, setFetching] = useState(false);
  const [franjaHoraria, setfranjaHoraria] = useState([]);
  const [turno, setTurno] = useState([]);
  const [franjaHorariaInput, setFranjaHorariaInput] = useState([]);
  const [diaInput, setDiaInput] = useState([]);
  const [turnoInput, setturnoInput] = useState([]);

  const fetch = useCallback(async () => {
    setFetching(true);
    const apiF = HTTP.get("/administraciones/franjaHoraria");
    const apiT = HTTP.get("/administraciones/turno");

    const [F, T] = await Promise.all([apiF, apiT]);

    setfranjaHoraria(F.data);
    setTurno(T.data);

    setturnoInput([...Array.from({ length: F.data.length }, (_, i) => null)]);
    setFranjaHorariaInput([
      ...Array.from({ length: F.data.length }, (_, i) => "-1"),
    ]);
    setDiaInput([...Array.from({ length: F.data.length }, (_, i) => "-1")]);

    setFetching(false);
  }, []);

  useEffect(() => {
    fetch();
  }, []);

  const handlerSubmit = () => {
    let cronograma = [];

    for (let i = 0; i < turnoInput.length; i++) {
      if (turnoInput[i] != null) {
        if (franjaHorariaInput[i] !== "-1" && diaInput[i] !== "-1") {
          cronograma.push({
            IdTurno: turnoInput[i],
            IdFranjaHoraria: franjaHorariaInput[i],
            Dia: diaInput[i],
          });
        } else {
          closeModal();
          showError("Los campos ingresados esta incompletos");
          return;
        }
      }
    }

    if (cronograma.length === 0) {
      closeModal();
      showError("No se a ingresado ningun cronograma");
      return;
    }

    for (let i = 0; i < cronograma.length; i++) {
      if (existeCronograma(seleccionados, cronograma[i], cuatrimestre)) {
        closeModal();
        showError("Ya existe una materia con estos horarios");
        return;
      }
    }

    closeModal();
    addMateria({ ...materia, cronograma }, true);
  };

  const handlerInput = (value, tipo, index) => {
    let aux = [];

    switch (tipo) {
      case 1:
        aux = [...turnoInput];
        aux[index] = value;
        setturnoInput(aux);
        break;
      case 2:
        aux = [...diaInput];
        aux[index] = value;
        setDiaInput(aux);
        break;
      case 3:
        aux = [...franjaHorariaInput];
        aux[index] = value;
        setFranjaHorariaInput(aux);
        break;
      default:
        break;
    }
  };

  return (
    <Modal show={show}>
      <Container cssClass="w-3/4 lg:w-1/4 min-h-[200px] bg-blue-500">
        <div className="flex justify-between m-auto p-2">
          <span></span>
          <h1 className="text-center">Cronograma</h1>
          <div>
            <IconButton onClickEvent={closeModal}>
              <BsX />
            </IconButton>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {turno.map((value, index) => (
            <div
              key={value.Id}
              className="flex flex-row justify-between w-full gap-3"
            >
              <Input
                type="checkbox"
                label={value.Descripcion}
                onChange={(e) => {
                  handlerInput(e.target.checked ? value.Id : null, 1, index);
                }}
              />
              <div className="w-[100px]">
                <label>Dia</label>
                <select
                  onChange={(e) => {
                    handlerInput(e.target.value, 2, index);
                  }}
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
              <div>
                <label>Franja horaria</label>
                <select
                  onChange={(e) => {
                    handlerInput(e.target.value, 3, index);
                  }}
                >
                  <option value={-1}> - </option>
                  {franjaHoraria.map((value) => (
                    <option value={value.Id} key={value.Id}>
                      {value.Descripcion}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
          <div className="flex justify-center">
            <Button name="Agregar" onClickEvent={() => handlerSubmit()} />
          </div>
        </div>
        {fetching && (
          <div className="flex justify-center items-center h-full">
            <Spinner />
          </div>
        )}
      </Container>
    </Modal>
  );
};

const existeCronograma = (arr = [], cronograma, cuatrimestre) => {
  let result = false;
  const aux = arr.filter((value) => value.cuatrimestre === cuatrimestre);

  aux.forEach((value) => {
    value.cronograma.forEach(({ IdTurno, IdFranjaHoraria, Dia }) => {
      if (
        Dia === cronograma.Dia &&
        IdTurno === cronograma.IdTurno &&
        checkHorario(IdFranjaHoraria, cronograma.IdFranjaHoraria)
      ) {
        result = true;
      }
    });
  });

  return result;
};

const checkHorario = (h1, h2) => {
  if (h2 == 3 || h1 == 3) return true;

  return h1 == h2;
};

export default MateriaCronograma;

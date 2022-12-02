import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import Layout from "../../components/Layout/Layout";
import LoadingModal from "../../components/LoadingModal/LoadingModal";
import HTTP from "../../config/axios";
import ErrorContext from "../../contexts/errorPopup/ErrorContext";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import GenerarTurno from "../../modals/GenerarTurno";
import ListaCronograma from "../../modals/ListaCronograma";
import SelectDocente from "../../modals/SelectDocente";

const CrearCronograma = ({ modificacion = false }) => {
  useProtectedRoute("administrador");
  const { showError } = useContext(ErrorContext);

  const [turnos, setTurnos] = useState([]);
  const [franjaHoraria, setFranjaHoraria] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modificar, setModificar] = useState(false);
  const [showLista, setShowLista] = useState(false);
  const [showSelect, setShowSelect] = useState(false);

  const [fetching, setFetching] = useState(true);
  const [materias, setMaterias] = useState([]);
  const [selected, setSelected] = useState(null);
  const [cronogramas, setCronogramas] = useState([]);
  const [cronoSelect, setCronoSelect] = useState(null);
  const [cronogramasCreados, setCronogramasCreados] = useState([]);
  const [cronogramasModificados, setcronogramasModificados] = useState([]);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const fetch = useCallback(async () => {
    setFetching(true);

    const res = await Promise.all([
      HTTP.get(
        "/administraciones/planEstudio/materias/" + searchParams.get("plan")
      ),
      HTTP.get("/administraciones/franjaHoraria"),
      HTTP.get("/administraciones/turno"),
      HTTP.get("/administraciones/planEstudio/" + searchParams.get("plan")),
    ]);

    setMaterias(res[0].data.materias);
    setFranjaHoraria(res[1].data);
    setTurnos(res[2].data);
    setCronogramasCreados(res[3].data.materiasDivision);
    setFetching(false);
  }, []);

  useEffect(() => {
    fetch();
  }, []);

  const addTurno = (crono) => {
    crono.Division = selected.cuatrimestre + crono.Division;
    if (
      cronogramas.some(
        (value) =>
          value.IdPlanEstudioMateria === selected.IdPlanEstudioMateria &&
          value.Division === crono.Division
      ) ||
      cronogramasCreados.some(
        (value) =>
          value.IdPlanEstudioMateria === selected.IdPlanEstudioMateria &&
          value.MateriaDivision.Division === crono.Division
      )
    ) {
      showError("La division ya existe");

      return;
    }
    setCronogramas([
      ...cronogramas,
      { ...crono, IdPlanEstudioMateria: selected.IdPlanEstudioMateria },
    ]);
  };

  const deleteTurno = (index) => {
    const filter = cronogramas.filter((value, i) => i !== index);

    setCronogramas(filter);
  };

  const selectCronogramaModificar = (value) => {
    setModificar(true);
    setCronoSelect(value);
    setShowLista(false);
    setShowModal(true);
  };

  const addModificado = (value) => {
    const newArr = cronogramasModificados.filter(
      (value) => value.IdCronograma !== cronoSelect.MateriaDivision.IdCronograma
    );

    newArr.push({
      ...value,
      IdCronograma: cronoSelect.MateriaDivision.IdCronograma,
      IdPlanEstudioMateria: cronoSelect.IdPlanEstudioMateria,
    });

    setcronogramasModificados(newArr);
  };

  const deleteModificado = (index) => {
    const filter = cronogramasModificados.filter((value, i) => i !== index);

    setcronogramasModificados(filter);
  };

  const seleccionarDocente = () => {
    setShowSelect(true);
  };

  const handlerSubmit = () => {
    if (!checkCronograma(materias, cronogramas, cronogramasCreados)) {
      showError("Algunas materias no tienen turnos");
      return;
    }

    HTTP.post("/administraciones/planEstudio/materiasDivision", {
      materiasDivision: cronogramas,
      cronogramasModificados: cronogramasModificados.map(
        ({ IdTurno, IdFranjaHoraria, Dia, IdCronograma }) => {
          return {
            IdTurno,
            IdFranjaHoraria,
            Dia,
            Id: IdCronograma,
          };
        }
      ),
    })
      .then(() => {
        navigate("/administrador/listadocarreras");
      })
      .catch((response) => {
        console.log(response);
        showError(response.data.msg);
      });
  };

  return (
    <Layout>
      {showModal && (
        <GenerarTurno
          show={showModal}
          closeModal={(value) => {
            setShowModal(value);
            setCronoSelect(null);
            setModificar(false);
          }}
          turnos={turnos}
          franjaHoraria={franjaHoraria}
          action={modificar ? addModificado : addTurno}
          IdPlanEstudioMateria={selected.IdPlanEstudioMateria}
          modificar={modificar}
        />
      )}
      {showLista && (
        <ListaCronograma
          show={showLista}
          closeModal={setShowLista}
          cronogramas={getCronoId(
            cronogramasCreados,
            selected.IdPlanEstudioMateria
          )}
          selectCrono={selectCronogramaModificar}
        />
      )}
      {showModal && (
        <SelectDocente
          show={showSelect}
          closeModal={() => setShowSelect(false)}
        />
      )}
      <LoadingModal show={fetching} />
      <Container>
        <h1 className="text-2xl text-center mb-4">
          {!modificacion ? "Crear cronograma" : "Modificar cronograma"}
        </h1>
        <div className="flex flex-col xl:flex-row xl:justify-between gap-3 mb-3">
          <div className="flex flex-col gap-3 w-1/4">
            <div className="bg-white h-[500px]">
              <p className="text-center p-3 bg-blue-400">Materias</p>
              {!fetching && (
                <ul className="overflow-auto">
                  {materias.map((value) => (
                    <SelectList
                      text={value.Descripcion}
                      key={value.Id}
                      onClick={() => {
                        setSelected(value);
                      }}
                      isSelect={selected != null && selected.Id === value.Id}
                    />
                  ))}
                </ul>
              )}
            </div>
            {selected && (
              <div>
                {!modificacion ? (
                  <Button
                    name="Crear turno"
                    onClickEvent={() => setShowModal(true)}
                  />
                ) : (
                  <Button
                    name="Ver turnos"
                    onClickEvent={() => setShowLista(true)}
                  />
                )}
              </div>
            )}
          </div>
          {!modificacion ? (
            <div className="flex flex-col gap-3 w-full">
              <div className="bg-white h-[500px]">
                <p className="text-center p-3 bg-blue-400">Nuevos turnos</p>
                {selected && (
                  <div className="overflow-auto">
                    {getCronoId(cronogramas, selected.IdPlanEstudioMateria).map(
                      (value, index) => (
                        <ItemCrono
                          {...value}
                          key={index}
                          onClick={() => deleteTurno(value.index)}
                        />
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3 w-full px-5">
              <div className="bg-white h-[500px]">
                <p className="text-center p-3 bg-blue-400">
                  Turnos modificados
                </p>
                {selected && (
                  <div className="overflow-auto">
                    {getCronoId(
                      cronogramasModificados,
                      selected.IdPlanEstudioMateria
                    ).map((value) => (
                      <ItemCrono
                        {...value}
                        key={value.index}
                        onClick={() => {
                          deleteModificado(value.index);
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-row justify-end">
          <Button
            name={!modificacion ? "Crear" : "Modificar"}
            onClickEvent={handlerSubmit}
          />
        </div>
      </Container>
    </Layout>
  );
};

const SelectList = ({ text, onClick, isSelect = false }) => (
  <li
    onClick={onClick}
    className={`text-center p-3 hover:bg-slate-400 hover:cursor-pointer ${
      isSelect && "bg-slate-400"
    }`}
  >
    {text}
  </li>
);

const ItemCrono = ({ IdFranjaHoraria, Dia, IdTurno, Division, onClick }) => (
  <div
    className="flex flex-col p-3 border-b-gray-400 border-b-2 hover:bg-red-300 hover:cursor-pointer"
    onClick={onClick}
  >
    {Division && <p>Division: {Division}</p>}
    <p>Turno: {getTurno(IdTurno)}</p>
    <p>Franja horaria: {getHorario(IdFranjaHoraria)}</p>
    <p>Dia: {Dia}</p>
  </div>
);

const getTurno = (id) => {
  switch (id) {
    case "1":
      return "Mañana";
    case "2":
      return "Tarde";
    case "3":
      return "Noche";
    default:
      return "-";
  }
};

const getHorario = (id) => {
  switch (id) {
    case "1":
      return "Primera hora";
    case "2":
      return "Segunda hora";
    case "3":
      return "Bloque completo";
    default:
      return "-";
  }
};

const getCronoId = (arr = [], id) => {
  const aux = arr.map((value, index) => {
    return { ...value, index };
  });

  return aux.filter((value) => value.IdPlanEstudioMateria === id);
};

const checkCronograma = (arr = [], crono = [], cronoDb = []) => {
  let flag = true;
  const idPlanEstudioArr = arr.map((value) => value.IdPlanEstudioMateria);
  const idCronoArr = crono.map((value) => value.IdPlanEstudioMateria);
  const idCronoDbArr = cronoDb.map((value) => value.IdPlanEstudioMateria);
  idPlanEstudioArr.forEach((value) => {
    if (!idCronoDbArr.includes(value) && !idCronoArr.includes(value)) {
      flag = false;
    }
  });

  return flag;
};

export default CrearCronograma;

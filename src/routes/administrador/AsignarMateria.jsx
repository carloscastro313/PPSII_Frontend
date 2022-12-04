import React, { useCallback, useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import Layout from "../../components/Layout/Layout";
import LoadingModal from "../../components/LoadingModal/LoadingModal";
import HTTP from "../../config/axios";
import ErrorContext from "../../contexts/errorPopup/ErrorContext";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import SelectDocente from "../../modals/SelectDocente";

const AsignarMateria = () => {
  useProtectedRoute("administrador");
  const { showError } = useContext(ErrorContext);

  const [fetching, setFetching] = useState(true);
  const [materias, setMaterias] = useState([]);
  const [cronograma, setCronograma] = useState([]);
  const [selectMateria, setSelectMateria] = useState(null);
  const [selectCronograma, setSelectCronograma] = useState(null);
  const [docentes, setDocentes] = useState([]);
  const [showSelectDocente, setShowSelectDocente] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const fetch = useCallback(async () => {
    setFetching(true);

    const res = await Promise.all([
      HTTP.get(
        "/administraciones/planEstudio/materias/" + searchParams.get("plan")
      ),
      HTTP.get(
        "/administraciones/planEstudio/cronograma/" + searchParams.get("plan")
      ),
      HTTP.get("/docentes/"),
    ]);

    setMaterias(res[0].data.materias);
    setCronograma(res[1].data.materiasDivision);
    setDocentes(res[2].data);
    console.log(res);

    setFetching(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCronograma = useCallback(async () => {
    const res = await HTTP.get(
      "/administraciones/planEstudio/cronograma/" + searchParams.get("plan")
    );

    setCronograma(res.data.materiasDivision);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const seleccionarCronograma = (value) => {
    setSelectCronograma(value);
    setShowSelectDocente(true);
  };

  const closeModal = () => {
    setSelectCronograma(null);
    setShowSelectDocente(false);
  };

  const asignarDocenteMateria = (value) => {
    setFetching(true);
    HTTP.post("/administraciones/docenteMaterias", {
      idDocente: value.Id,
      idMateriaDivision: selectCronograma.MateriaDivision.Id,
    })
      .then(() => {
        fetchCronograma();
      })
      .catch((error) => {
        console.log(error);
        showError(error.response.data.msg);
      })
      .finally(() => {
        closeModal();
        setFetching(false);
      });
  };

  return (
    <Layout>
      {showSelectDocente && (
        <SelectDocente
          show={showSelectDocente}
          closeModal={closeModal}
          docentes={docentes}
          onSelect={asignarDocenteMateria}
        />
      )}
      <LoadingModal show={fetching} />
      <Container>
        <h1 className="text-2xl text-center text-white my-1">
          Asignar docente a materia
        </h1>
        <div className="flex flex-col xl:flex-row xl:justify-between gap-3 mt-10">
          <div className="w-1/4 flex flex-col gap-3">
            <div className="bg-white h-[500px]">
              <p className="text-center p-3 bg-gray-500 text-white">Materias</p>
              {!fetching && (
                <ul className="overflow-auto">
                  {materias.map((value) => (
                    <SelectList
                      text={value.Descripcion}
                      key={value.Id}
                      onClick={() => {
                        setSelectMateria(value);
                      }}
                      isSelect={
                        selectMateria != null && selectMateria.Id === value.Id
                      }
                    />
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <div className="bg-white h-[500px]">
              <p className="text-center p-3 bg-gray-500 text-white">
                Divisiones
              </p>
              {selectMateria && (
                <div className="overflow-auto">
                  {getCronoId(
                    cronograma,
                    selectMateria.IdPlanEstudioMateria
                  ).map((value, index) => (
                    <ItemCrono
                      {...value}
                      key={index}
                      onClick={() => {
                        seleccionarCronograma(value);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

const ItemCrono = ({
  FranjaHoraria,
  Dia,
  Turno,
  Division,
  Docente,
  MateriaDivision,
  onClick,
}) => (
  <div
    className="flex flex-col p-3 border-b-gray-400 border-b-2 hover:bg-slate-400 hover:cursor-pointer"
    onClick={onClick}
  >
    {Division && <p>Division: {Division}</p>}
    <p>Turno: {Turno}</p>
    <p>Franja horaria: {FranjaHoraria}</p>
    <p>Dia: {Dia}</p>
    <p>Division: {MateriaDivision.Division}</p>
    <p>
      Docente:{" "}
      {Docente ? `${Docente.Nombre} ${Docente.Apellido}` : "No asignado"}
    </p>
  </div>
);

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

const getCronoId = (arr = [], id) => {
  return arr.filter((value) => value.IdPlanEstudioMateria === id);
};

export default AsignarMateria;

import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import Layout from "../../components/Layout/Layout";
import ListaDinamicaClick from "../../components/ListaDinamicaClick/ListaDinamicaClick";
import Spinner from "../../components/Spinner/Spinner";
import HTTP from "../../config/axios";
import ErrorContext from "../../contexts/errorPopup/ErrorContext";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import MateriaCronograma from "../../modals/MateriaCronograma";

const CrearPlan = () => {
  const { showError } = useContext(ErrorContext);

  const [fetching, setFetching] = useState(true);
  const [materias, setMaterias] = useState([]);
  const [seleccion, setSeleccion] = useState([]);
  const [duracion, setDuracion] = useState(1);
  const [cuatrimestre, setCuatrimestre] = useState(1);
  const [cronograma, setCronograma] = useState(false);
  const [materiaSelected, setMateriaSelected] = useState(null);

  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  useProtectedRoute("administrador");

  const fetch = useCallback(async () => {
    setFetching(true);
    const { data } = await HTTP.get("/administraciones/materia");
    console.log(data);
    setMaterias(data);

    if (searchParams.get("plan") != "") {
      const plan = (
        await HTTP.get(
          "/administraciones/planEstudio/" + searchParams.get("plan")
        )
      ).data;
      const aux = plan.materias.map((value) => {
        return { ...value, cuatrimestre: parseInt(value.cuatrimestre) };
      });
      const materiasAnteriores = aux.map(({ Id }) => {
        return Id;
      });

      setMaterias(
        data.filter((value) => !materiasAnteriores.includes(value.Id))
      );

      setSeleccion(aux);

      setDuracion(getCuatrimestre(aux, plan.planEstudio.Duracion));
    }

    setFetching(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetch]);

  const submitForm = () => {
    if (seleccion.length === 0) {
      showError("No hay materias seleccionadas");
      return;
    }

    const empty = isCuatrimestreEmpty(seleccion, duracion);

    if (empty.length > 0) {
      const strError = createStrError(empty);

      showError("Los cuatrimestres " + strError + " esta vacios");
      return;
    }

    console.log(seleccion);

    HTTP.post("/administraciones/planEstudio", {
      planEstudio: {
        IdCarrera: params["id"],
        Duracion: duracion - 1,
      },
      materias: dataTransform(seleccion),
    })
      .then(() => {
        navigate("/administrador/listadocarreras");
      })
      .catch((data) => {
        console.log(data);
        //showError(response.data.msg);
      });
  };

  const onSelectMateria = (values, isSelect) => {
    console.log(values, seleccion);
    var aux = [];
    if (isSelect) {
      aux = [...seleccion, { ...values, cuatrimestre }];
      setSeleccion(aux);
      setMaterias(materias.filter((value) => value.Id !== values.Id));
    } else {
      aux = seleccion.filter((value) => value.Id !== values.Id);
      setMaterias([
        ...materias,
        {
          Id: values.Id,
          Descripcion: values.Descripcion,
        },
      ]);
      setSeleccion(aux);
    }
    const len = getCuatrimestre(aux, duracion);
    setDuracion(len);

    if (!isSelect && len < cuatrimestre) {
      setCuatrimestre(len);
    }
  };

  const openModal = (values) => {
    setCronograma(true);
    setMateriaSelected(values);
  };

  const closeModal = () => {
    setCronograma(false);
    setMateriaSelected(null);
  };

  return (
    <Layout>
      {cronograma && (
        <MateriaCronograma
          show={cronograma}
          materia={materiaSelected}
          closeModal={closeModal}
          addMateria={onSelectMateria}
          seleccionados={seleccion}
          cuatrimestre={cuatrimestre}
        />
      )}
      <Container>
        <h1 className="text-2xl text-center mb-4">Asignar plan de estudio</h1>
        <div className="flex flex-col xl:flex-row xl:justify-between gap-3 mb-3">
          <div className="w-full xl:w-[600px]">
            <p className="text-center p-3 bg-blue-400">Materias</p>
            <div className="bg-white  h-[400px]">
              {materias.length > 0 && (
                <ListaDinamicaClick
                  onClickEvent={(values) => {
                    openModal(values);
                  }}
                  listado={materias}
                  skip={["Id"]}
                  headerEnable={false}
                />
              )}
              {materias.length === 0 && (
                <div className="flex justify-center h-full">
                  <h1 className="my-auto text-xl">No hay materias</h1>
                </div>
              )}
            </div>
            {fetching && (
              <div className="flex justify-center items-center h-full">
                <Spinner />
              </div>
            )}
          </div>
          <div className="w-full xl:w-[600px]">
            <div className="flex justify-between bg-blue-400 p-3">
              <p className="text-center">Correlativas</p>
              <select
                onChange={(e) => setCuatrimestre(parseInt(e.target.value))}
              >
                {[...Array.from({ length: duracion }, (_, i) => i + 1)].map(
                  (value) => (
                    <option key={value}>{value}</option>
                  )
                )}
              </select>
            </div>
            <div className="bg-white h-[400px]">
              {seleccion.length > 0 && (
                <ListaDinamicaClick
                  onClickEvent={(values) => {
                    onSelectMateria(values, false);
                  }}
                  listado={filterCuatrimestre(seleccion, cuatrimestre)}
                  headerEnable={false}
                  skip={["Id", "cuatrimestre", "cronograma"]}
                />
              )}
              {seleccion.length === 0 && (
                <div className="flex justify-center h-full">
                  <h1 className="my-auto text-xl">No hay correlativas</h1>
                </div>
              )}
            </div>
            {fetching && (
              <div className="flex justify-center items-center h-full">
                <Spinner />
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end w-full">
          <Button
            onClickEvent={submitForm}
            name="Crear"
            cssClass="bg-blue-600 hover:bg-blue-400 text-white w-[200px]"
          />
        </div>
      </Container>
    </Layout>
  );
};

const filterCuatrimestre = (arr = [], cuatrimestre) => {
  // eslint-disable-next-line eqeqeq
  return arr.filter((value) => value.cuatrimestre == cuatrimestre);
};

const getCuatrimestre = (arr = [], cant = 1) => {
  const arrCuatrimestre = [];
  let index = 0;
  for (let i = 1; i <= cant; i++) {
    arrCuatrimestre.push(
      arr.filter(({ cuatrimestre }) => cuatrimestre == i).length
    );
  }

  arrCuatrimestre.forEach((value, i) => {
    if (value !== 0) {
      index = i + 1;
    }
  });

  return index + 1;
};

const isCuatrimestreEmpty = (arr = [], cant) => {
  const arrCuatrimestre = [];
  let index = [];
  for (let i = 1; i < cant; i++) {
    arrCuatrimestre.push(
      arr.filter(({ cuatrimestre }) => cuatrimestre == i).length
    );
  }

  arrCuatrimestre.forEach((value, i) => {
    if (value === 0) {
      index.push(i + 1);
    }
  });

  return index;
};

const createStrError = (arr = []) => {
  let res = "";

  if (arr.length === 1) {
    return arr[0];
  }

  arr.forEach((value, i) => {
    res += `${value}`;

    if (i === arr.length - 2) {
      res += ` y `;
    } else if (i !== arr.length - 1) {
      res += `, `;
    }

    return res;
  });

  return res;
};

const dataTransform = (arr = []) => {
  let res = [];

  arr.forEach(({ Id, Descripcion, cuatrimestre, cronograma }) => {
    cronograma.forEach(({ IdTurno, IdFranjaHoraria, Dia }) => {
      res.push({
        IdMateria: Id,
        Cuatrimestre: cuatrimestre,
        IdTurno,
        IdFranjaHoraria,
        Dia,
      });
    });
  });

  return res;
};

export default CrearPlan;

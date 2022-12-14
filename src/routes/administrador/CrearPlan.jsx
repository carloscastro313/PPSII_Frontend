import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import Layout from "../../components/Layout/Layout";
import ListaDinamicaClick from "../../components/ListaDinamicaClick/ListaDinamicaClick";
import LoadingModal from "../../components/LoadingModal/LoadingModal";
import Spinner from "../../components/Spinner/Spinner";
import HTTP from "../../config/axios";
import ErrorContext from "../../contexts/errorPopup/ErrorContext";
import useProtectedRoute from "../../hooks/useProtectedRoute";

const CrearPlan = () => {
  const { showError } = useContext(ErrorContext);

  const [fetching, setFetching] = useState(true);
  const [materias, setMaterias] = useState([]);
  const [seleccion, setSeleccion] = useState([]);
  const [duracion, setDuracion] = useState(1);
  const [cuatrimestre, setCuatrimestre] = useState(1);

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
          "/administraciones/planEstudio/materias/" + searchParams.get("plan")
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

      setSeleccion(
        aux.map(({ Id, Descripcion, cuatrimestre }) => {
          return { Id, Descripcion, cuatrimestre };
        })
      );

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
    setFetching(true);
    if (seleccion.length === 0) {
      setFetching(false);
      showError("No hay materias seleccionadas");
      return;
    }

    const empty = isCuatrimestreEmpty(seleccion, duracion);

    if (empty.length > 0) {
      const strError = createStrError(empty);
      setFetching(false);
      showError("Los cuatrimestres " + strError + " esta vacios");
      return;
    }

    console.log(seleccion);

    HTTP.post("/administraciones/planEstudio", {
      planEstudio: {
        IdCarrera: params["id"],
        Duracion: duracion - 1,
      },
      materias: seleccion.map((value) => {
        return { IdMateria: value.Id, Cuatrimestre: value.cuatrimestre };
      }),
    })
      .then(() => {
        navigate("/administrador/listadocarreras");
      })
      .catch((data) => {
        console.log(data);
        //showError(response.data.msg);
      })
      .finally(() => setFetching(false));
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

    setDuracion(getCuatrimestre(aux, duracion));
  };

  return (
    <Layout>
      <LoadingModal show={fetching} />
      <Container>
        <h1 className="text-2xl text-center my-4 text-white">
          Crear plan de estudio
        </h1>
        <div className="flex flex-col xl:flex-row xl:justify-between gap-3 mt-16">
          <div className="w-full xl:w-[600px]">
            <p className="text-center p-3 bg-gray-500 text-white">
              Materias disponibles
            </p>
            <div className="bg-white  h-[400px]">
              {materias.length > 0 && (
                <ListaDinamicaClick
                  onClickEvent={(values) => {
                    onSelectMateria(values, true);
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
            <div className="flex justify-between bg-gray-500 text-white p-3">
              <p className="text-center m-auto pl-7">
                Materias por cuatrimestre
              </p>
              <select
                className="text-black"
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
                  skip={["Id", "cuatrimestre"]}
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
        <div className="flex justify-end w-full mt-3">
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

export default CrearPlan;

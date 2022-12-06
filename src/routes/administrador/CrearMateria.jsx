import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import Input from "../../components/Input/Input";
import Layout from "../../components/Layout/Layout";
import ListaDinamicaClick from "../../components/ListaDinamicaClick/ListaDinamicaClick";
import LoadingModal from "../../components/LoadingModal/LoadingModal";
import Spinner from "../../components/Spinner/Spinner";
import HTTP from "../../config/axios";
import ErrorContext from "../../contexts/errorPopup/ErrorContext";
import useProtectedRoute from "../../hooks/useProtectedRoute";

const CrearMateria = ({ modificacion }) => {
  const { showError } = useContext(ErrorContext);

  const [fetching, setFetching] = useState(false);
  const [Descripcion, setDescripcion] = useState("");
  const [materias, setMaterias] = useState([]);
  const [seleccion, setSeleccion] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

  useProtectedRoute("administrador");

  const fetch = useCallback(async () => {
    setFetching(true);
    const { data } = await HTTP.get("/administraciones/materia");
    console.log(data);
    setMaterias(data);

    if (modificacion) {
      const id = params["id"];

      const {
        data: { materia, materiasCorrelativas },
      } = await HTTP.get("/administraciones/materia/" + id);

      setDescripcion(materia.Descripcion);
      const idCorrelativas = materiasCorrelativas.map(({ Id }) => {
        return Id;
      });
      idCorrelativas.push(parseInt(id));
      setMaterias(data.filter((value) => !idCorrelativas.includes(value.Id)));
      setSeleccion(materiasCorrelativas);
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
    if (Descripcion.trim() === "") {
      setFetching(false);
      showError("El nombre es obligatorio");
      return;
    }

    if (modificacion) {
      HTTP.put("/administraciones/materia", {
        materia: { Id: params["id"], Descripcion },
        correlativas: seleccion.map((value) => value.Id),
      })
        .then(() => {
          navigate("/administrador/listadomateria");
        })
        .catch((error) => {
          console.log(error);
          showError(error.data.msg);
        })
        .finally(() => setFetching(false));
    } else {
      HTTP.post("/administraciones/materia", {
        materia: { Descripcion },
        correlativas: seleccion.map((value) => value.Id),
      })
        .then(() => {
          navigate("/administrador/listadomateria");
        })
        .catch((error) => {
          console.log(error);
          showError(error.data.msg);
        })
        .finally(() => setFetching(false));
    }
  };

  const onSelectMateria = (values, isSelect) => {
    console.log(values, seleccion);

    if (isSelect) {
      setSeleccion([...seleccion, values]);
      setMaterias(materias.filter((value) => value.Id !== values.Id));
    } else {
      setMaterias([...materias, values]);
      setSeleccion(seleccion.filter((value) => value.Id !== values.Id));
    }
  };

  return (
    <Layout>
      <LoadingModal show={fetching} />
      <Container>
        <h1 className="text-2xl text-center text-white mb-4">
          {modificacion ? "Modificar materia" : "Crear materia"}
        </h1>
        <div className="w-[400px] mb-5">
          <Input
            type="text"
            id="Descripcion"
            label="Nombre de la materia"
            value={Descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <div className="flex flex-col xl:flex-row xl:justify-between gap-3 mb-3">
          <div className="w-full xl:w-[600px]">
            <p className="text-center p-3 bg-blue-400">Materias</p>
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
            <p className="text-center p-3 bg-blue-400">Correlativas</p>
            <div className="bg-white h-[400px]">
              {seleccion.length > 0 && (
                <ListaDinamicaClick
                  onClickEvent={(values) => {
                    onSelectMateria(values, false);
                  }}
                  listado={seleccion}
                  headerEnable={false}
                  skip={["Id"]}
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

export default CrearMateria;

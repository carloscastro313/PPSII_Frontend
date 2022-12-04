import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { BsX } from "react-icons/bs";
import Container from "../components/Container/Container";
import FormDinamico from "../components/FormDinamico/FormDinamico";
import IconButton from "../components/IconButton/IconButton";
import Modal from "../components/Modal/Modal";
import HTTP from "../config/axios";
import ErrorContext from "../contexts/errorPopup/ErrorContext";
import carreraForm from "../helpers/carreraForm";

var formInput = [
  {
    type: "hidden",
    label: "",
    id: "Id",
  },
  {
    type: "text",
    label: "Nombre",
    id: "Descripcion",
  },
];

const FormCarrera = ({
  closeModal,
  visible = false,
  value = null,
  modifcar = false,
  setFetching,
}) => {
  const { showError } = useContext(ErrorContext);

  const [values, setValues] = useState({
    Id: "-1",
    Descripcion: "",
  });

  useEffect(() => {
    if (visible && modifcar) {
      setValues({
        Id: value.Id,
        Descripcion: value.Descripcion,
      });
    } else {
      setValues({
        Id: "-1",
        Descripcion: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, modifcar]);

  const submitHandler = (values) => {
    setFetching(true);
    if (modifcar) {
      HTTP.put("/administraciones/carrera/", values)
        .then(() => {
          closeModal(false);
        })
        .catch(({ response }) => {
          showError(response.data.msg);
        })
        .finally(() => setFetching(false));
    } else {
      HTTP.post("/administraciones/carrera", {
        Descripcion: values.Descripcion,
      })
        .then(() => {
          closeModal(false);
        })
        .catch(({ response }) => {
          showError(response.data.msg);
        })
        .finally(() => setFetching(false));
    }
  };

  return (
    <Modal show={visible}>
      <Container cssClass="w-3/4 lg:w-1/4 min-h-[200px] bg-primary">
        <div className="flex justify-between m-auto p-2">
          <span></span>
          <h1 className="text-center text-white ml-5">
            {modifcar ? "Modificar carrera" : "Crear carrera"}
          </h1>
          <div>
            <IconButton onClickEvent={() => closeModal()}>
              <BsX />
            </IconButton>
          </div>
        </div>
        {visible && (
          <FormDinamico
            btnSubmit={modifcar ? "Modificar" : "Crear"}
            inputs={formInput}
            validate={carreraForm}
            onSubmit={submitHandler}
            initialValues={values}
          />
        )}
      </Container>
    </Modal>
  );
};

export default FormCarrera;

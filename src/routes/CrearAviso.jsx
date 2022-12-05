import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";
import Container from "../components/Container/Container";
import Input from "../components/Input/Input";
import Layout from "../components/Layout/Layout";
import LoadingModal from "../components/LoadingModal/LoadingModal";
import HTTP from "../config/axios";
import AuthContext from "../contexts/auth/AuthContext";
import ErrorContext from "../contexts/errorPopup/ErrorContext";

const CrearAviso = () => {
  const { showError } = useContext(ErrorContext);
  const { usuario } = useContext(AuthContext);

  const [fetching, setFetching] = useState(false);
  const [Titulo, setTitulo] = useState("");
  const [Mensaje, setMensaje] = useState("");
  const [docentes, setDocentes] = useState(false);
  const [alumnos, setAlumnos] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [secretaria, setSecretaria] = useState(false);

  const navigate = useNavigate();

  const handlerSubmit = async (e) => {
    e.preventDefault();

    setFetching(true);
    if (Titulo.trim() === "" || Mensaje.trim() === "") {
      setFetching(false);
      showError("Todos los campos son obligatorios");
      return;
    }

    if (![alumnos, docentes, secretaria, admin].includes(true)) {
      setFetching(false);
      showError("Se tiene que seleccionar al menos un remitente");
      return;
    }

    try {
      const { data } = await HTTP.get("administraciones/traerGruposDePersonas");

      let Receptores = [];
      const { Administracion, Secretaria, Docentes, TodosLosAlumnos } = data;

      if (alumnos) Receptores = [...Receptores, ...TodosLosAlumnos];

      if (docentes) Receptores = [...Receptores, ...Docentes];

      if (secretaria) Receptores = [...Receptores, ...Secretaria];

      if (admin) Receptores = [...Receptores, ...Administracion];

      await HTTP.post("/avisos/", {
        Receptores,
        Mensaje,
        Titulo,
      });
    } catch (error) {
      showError("No se pudo enviar los avisos");
    } finally {
      navigate("/");
      setFetching(false);
    }
  };

  return (
    <Layout>
      <LoadingModal show={fetching} />
      <Container>
        <form className="flex flex-col gap-3 h-full" onSubmit={handlerSubmit}>
          <h1 className="text-2xl text-center text-white my-1">Crear aviso</h1>
          <div className="flex flex-row">
            <div className="w-[400px]">
              <Input
                type="text"
                label="Titulo"
                value={Titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </div>
          </div>
          <div className="p-3 h-2/3">
            <p className="text-lg pl-1 text-white">Mensaje</p>
            <textarea
              value={Mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              className="w-full h-full resize-none"
            />
          </div>
          <div className="mt-3 flex flex-row justify-between">
            <div className="flex flex-row">
              <p className="m-auto text-white">Remitentes:</p>
              {usuario.TipoUsuario === "administrador" && (
                <div className="flex flex-col gap-3 px-3">
                  <label htmlFor="administracion" className="text-white">
                    Administración
                  </label>
                  <input
                    id="administracion"
                    type="checkbox"
                    checked={admin}
                    onChange={(e) => setAdmin(e.target.checked)}
                  />
                </div>
              )}
              {(usuario.TipoUsuario === "administrador" ||
                usuario.TipoUsuario === "secretaria") && (
                <div className="flex flex-col gap-3 px-3">
                  <label htmlFor="secretaria" className="text-white">
                    Secretaria
                  </label>
                  <input
                    id="secretaria"
                    type="checkbox"
                    checked={secretaria}
                    onChange={(e) => setSecretaria(e.target.checked)}
                  />
                </div>
              )}
              {(usuario.TipoUsuario === "administrador" ||
                usuario.TipoUsuario === "secretaria") && (
                <div className="flex flex-col gap-3 px-3">
                  <label htmlFor="docente" className="text-white">
                    Docentes
                  </label>
                  <input
                    id="docente"
                    type="checkbox"
                    checked={docentes}
                    onChange={(e) => setDocentes(e.target.checked)}
                  />
                </div>
              )}

              <div className="flex flex-col gap-3 px-3">
                <label htmlFor="alumno" className="text-white">
                  Alumnos
                </label>
                <input
                  id="alumno"
                  type="checkbox"
                  checked={alumnos}
                  onChange={(e) => setAlumnos(e.target.checked)}
                />
              </div>
            </div>
            <div>
              <Button type="submit" name="Enviar" />
            </div>
          </div>
        </form>
      </Container>
    </Layout>
  );
};

export default CrearAviso;

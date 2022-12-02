import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";
import Container from "../components/Container/Container";
import Layout from "../components/Layout/Layout";
import AuthContext from "../contexts/auth/AuthContext";
import { menuBtns } from "../types";

const Index = () => {
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <Layout>
      <Container>
        <div className="h-1/2">
          <h1 className="mb-3 text-xl">
            Bienvenido {usuario && usuario.nombre}
          </h1>
          <div className="flex flex-col w-full sm:flex-wrap sm:flex-row gap-3 overflow-x-auto max-h-60">
            {usuario &&
              menuBtns[usuario.TipoUsuario].map(({ name, route }) => (
                <Button
                  name={name}
                  cssClass="bg-white hover:bg-blue-100 text-black w-full h-12 sm:h-24 sm:w-24"
                  key={name}
                  onClickEvent={() => navigate(route)}
                />
              ))}
            <Button
              name={"Cambiar contraseña"}
              cssClass="bg-white hover:bg-blue-100 text-black w-full h-12 sm:h-24 sm:w-24"
              onClickEvent={() => navigate("/cambiarcontraseña")}
            />
          </div>
        </div>
        <div className="h-1/2 bg-white">Alertas</div>
      </Container>
    </Layout>
  );
};

export default Index;

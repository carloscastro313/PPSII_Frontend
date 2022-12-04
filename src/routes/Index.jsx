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
      <Container cssClass="w-[480px] bg-primary">
        <div className="h-1/2">
          <h1 className="mb-3 text-xl text-white">
            Bienvenido {usuario && usuario.Nombre}
          </h1>
          <div className="flex w-full flex-wrap flex-col gap-3 overflow-x-auto">
            {usuario &&
              menuBtns[usuario.TipoUsuario].map(({ name, route }) => (
                <Button
                  name={name}
                  cssClass="bg-white hover:bg-blue-100 text-black w-full h-34"
                  key={name}
                  onClickEvent={() => navigate(route)}
                />
              ))}
            <Button
              name={"Cambiar contraseña"}
              cssClass="bg-white hover:bg-blue-100 text-black w-full w-34 h-34"
              onClickEvent={() => navigate("/cambiarcontraseña")}
            />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Index;

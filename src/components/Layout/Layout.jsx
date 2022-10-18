import React, { useContext } from "react";
import { useState } from "react";
import AuthContext from "../../contexts/auth/AuthContext";
import useAuth from "../../hooks/useAuth";
import { menuBtns } from "../../types";
import ErrorModal from "../ErrorModal/ErrorModal";
import Header from "../Header/Header";
import SideNav from "../SideNav/SideNav";
import "./Layout.css";

const Layout = ({ children }) => {
  const { usuario } = useContext(AuthContext);
  const [showNav, setShowNav] = useState(false);

  useAuth();

  return (
    <>
      <ErrorModal />
      <div className="layout">
        {usuario && (
          <SideNav
            show={showNav}
            showEvent={setShowNav}
            menuButtons={menuBtns[usuario.tipo]}
          />
        )}
        <Header showEvent={setShowNav} />
        {children}
      </div>
    </>
  );
};

export default Layout;

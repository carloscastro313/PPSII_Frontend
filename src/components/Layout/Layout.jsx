import React from "react";
import { useState } from "react";
import { sideNavMockData } from "../../mockData/sideNavMock";
import Header from "../Header/Header";
import SideNav from "../SideNav/SideNav";
import "./Layout.css";

const Layout = ({ children }) => {
  const [showNav, setShowNav] = useState(false);

  return (
    <>
      <div className="layout">
        <SideNav
          show={showNav}
          showEvent={setShowNav}
          menuButtons={sideNavMockData}
        />
        <Header showEvent={setShowNav} />
        <div className="mt-5 my-auto">{children}</div>
      </div>
    </>
  );
};

export default Layout;

import { useEffect } from "react";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/auth/AuthContext";

const useAuth = () => {
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (usuario == null && location.pathname !== "/login") navigate("/login");
    else if (usuario != null && location.pathname === "/login") navigate("/");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario]);
};

export default useAuth;

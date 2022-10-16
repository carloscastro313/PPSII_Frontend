import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/auth/AuthContext";

const useProtectedRoute = (userType) => {
  const { usuario } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (usuario && userType !== usuario.tipo) navigate("/");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario]);
};

export default useProtectedRoute;

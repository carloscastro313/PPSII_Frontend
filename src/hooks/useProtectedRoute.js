import { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/auth/AuthContext";

const useProtectedRoute = (userType) => {
  const { usuario } = useContext(AuthContext);
  const [user] = useState(userType);
  const navigate = useNavigate();

  useEffect(() => {
    if (usuario && user !== usuario.TipoUsuario) navigate("/");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario]);
};

export default useProtectedRoute;

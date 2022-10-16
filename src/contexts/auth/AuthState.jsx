import React, { useReducer } from "react";
import { LOADING, LOGIN, LOGOUT } from "../../types";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    usuario: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const login = (usuario) => {
    dispatch({
      type: LOADING,
    });
    console.log(usuario);
    try {
      const payload = {
        usuario: {
          ...usuario,
          tipo: "alumno",
          nombre: "testing",
          apellido: "testing",
        },
        token: "asd",
      };

      setTimeout(() => {
        dispatch({
          type: LOGIN,
          payload,
        });
      }, 1000);
    } catch ({ response }) {
      console.log(response);
    }
  };

  const signOut = () => {
    dispatch({
      type: LOGOUT,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        signOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;

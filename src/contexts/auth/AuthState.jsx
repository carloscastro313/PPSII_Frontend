import React, { useReducer } from "react";
import { useEffect } from "react";
import HTTP from "../../config/axios";
import tokenAuth from "../../config/token";
import getTipoUsuario from "../../helpers/getTipoUsuario";
import { ERROR, LOADING, LOGIN, LOGOUT } from "../../types";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    usuario: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    obtenerUsuario();
  }, []);

  const obtenerUsuario = async () => {
    try {
      if (state.token) {
        tokenAuth(state.token);
      }

      const {
        data: { token, usuario },
      } = await HTTP.post("/usuarios/check");
      dispatch({
        type: LOGIN,
        payload: {
          token,
          usuario: {
            ...usuario,
            TipoUsuario: getTipoUsuario(usuario.TipoUsuario),
          },
        },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: LOGOUT,
      });
    }
  };

  const login = (datos) =>
    new Promise(async (resolve, reject) => {
      dispatch({
        type: LOADING,
      });
      try {
        const {
          data: { token, usuario },
        } = await HTTP.post("/usuarios/login", datos);

        tokenAuth(token);

        dispatch({
          type: LOGIN,
          payload: {
            token,
            usuario: {
              ...usuario,
              TipoUsuario: getTipoUsuario(usuario.TipoUsuario),
            },
          },
        });
        resolve({
          result: true,
        });
      } catch (error) {
        dispatch({
          type: ERROR,
        });
        console.log(error);
        reject(error.response.data.body);
      }
    });

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

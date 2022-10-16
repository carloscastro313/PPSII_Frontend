import { LOADING, LOGIN, LOGOUT } from "../../types";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      //localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        usuario: action.payload.usuario,
        loading: false,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        usuario: null,
        loading: false,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default AuthReducer;

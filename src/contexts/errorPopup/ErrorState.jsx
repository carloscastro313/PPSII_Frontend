import { useReducer } from "react";
import { CLOSE, SHOW } from "../../types";
import ErrorContext from "./ErrorContext";
import ErrorReducer from "./ErrorReducer";

const ErrorState = (prop) => {
  const initialState = {
    msg: "null",
    show: true,
  };

  const [state, dispatch] = useReducer(ErrorReducer, initialState);

  const showError = (msg) => {
    dispatch({
      payload: {
        msg,
      },
      type: SHOW,
    });
  };

  const closeError = () => {
    dispatch({
      type: CLOSE,
    });
  };

  return (
    <ErrorContext.Provider
      value={{
        ...state,
        showError,
        closeError,
      }}
    >
      {prop.children}
    </ErrorContext.Provider>
  );
};

export default ErrorState;

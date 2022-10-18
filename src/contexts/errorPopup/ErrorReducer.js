import { CLOSE, SHOW } from "../../types";

const ErrorReducer = (state, action) => {
  switch (action.type) {
    case SHOW:
      return {
        ...state,
        msg: action.payload.msg,
        show: true,
      };
    case CLOSE:
      return {
        ...state,
        msg: "",
        show: false,
      };
    default:
      return state;
  }
};

export default ErrorReducer;

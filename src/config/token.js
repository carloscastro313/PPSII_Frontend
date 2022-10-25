import HTTP from "./axios";

const tokenAuth = (token) => {
  if (token) HTTP.defaults.headers.common["authorization"] = "Bearer " + token;
  else delete HTTP.defaults.headers.common["authorization"];
};

export default tokenAuth;

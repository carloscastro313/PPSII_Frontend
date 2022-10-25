import axios from "axios";

const HTTP = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API,
});
console.log(process.env.REACT_APP_BACKEND_API);
export default HTTP;

import axios from "axios";

const HTTP = axios.create({
  baseURL: process.env.REACT_APP_API,
});

export default HTTP;

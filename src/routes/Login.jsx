import { useContext } from "react";
import FormDinamico from "../components/FormDinamico/FormDinamico";
import Layout from "../components/Layout/Layout";
import LoadingModal from "../components/LoadingModal/LoadingModal";
import AuthContext from "../contexts/auth/AuthContext";
import ErrorContext from "../contexts/errorPopup/ErrorContext";
import loginValidation from "../helpers/loginValidation";

const formInput = [
  {
    type: "text",
    label: "N° Legajo",
    id: "Legajo",
  },
  {
    type: "password",
    label: "Contraseña",
    id: "Contraseña",
  },
];

const initialValues = {
  Legajo: "",
  Contraseña: "",
};

const Login = () => {
  const { login, loading } = useContext(AuthContext);
  const { showError } = useContext(ErrorContext);
  const submitHandler = (values) => {
    login(values).catch((msg) => {
      showError(msg);
    });
  };

  return (
    <Layout>
      <LoadingModal show={loading} />
      <div className="h-full flex justify-center place-items-center text-white">
        <div className="w-80 h-80 bg-primary rounded">
          <h1 className="text-2xl text-center my-4">Iniciar sesión</h1>
          <FormDinamico
            initialValues={initialValues}
            onSubmit={submitHandler}
            validate={loginValidation}
            inputs={formInput}
            btnSubmit="Ingresar"
            cssButton="bg-gray-500 hover:bg-gray-700 text-white"
          />
        </div>
      </div>
      <div className="footer">
        <div>
          <p></p>
        </div>
      </div>
    </Layout>
  );
};

export default Login;

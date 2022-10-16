import { useContext } from "react";
import FormDinamico from "../components/FormDinamico/FormDinamico";
import Layout from "../components/Layout/Layout";
import AuthContext from "../contexts/auth/AuthContext";
import loginValidation from "../helpers/loginValidation";

const formInput = [
  {
    type: "text",
    label: "Email",
    id: "email",
  },
  {
    type: "password",
    label: "Contraseña",
    id: "contraseña",
  },
];

const initialValues = {
  email: "",
  contraseña: "",
};

const Login = () => {
  const { login } = useContext(AuthContext);

  const submitHandler = (values) => {
    console.log(values);
    login(values);
  };

  return (
    <Layout>
      <div className="h-full flex justify-center place-items-center">
        <div className="w-80 h-80 bg-blue-300 rounded">
          <h1 className="text-2xl text-center my-4">Iniciar sesión</h1>
          <FormDinamico
            initialValues={initialValues}
            onSubmit={submitHandler}
            validate={loginValidation}
            inputs={formInput}
            btnSubmit="Ingresar"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Login;

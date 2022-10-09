import Button from "./components/Button/Button";
import FormDinamico from "./components/FormDinamico/FormDinamico";
import Layout from "./components/Layout/Layout";
import ListaDinamica from "./components/ListaDinamica/ListaDinamica";
import ListaDinamicaClick from "./components/ListaDinamicaClick/ListaDinamicaClick";
import loginValidation from "./helpers/loginValidation";
import { formMockData, initialValues, onSubmit } from "./mockData/formMock";
import { actionsMock, funcTest, listadoMock } from "./mockData/listadoMock";

function App() {
  return (
    <Layout>
      <ListaDinamica listado={listadoMock} actions={actionsMock} />
      <ListaDinamicaClick listado={listadoMock} onClickEvent={funcTest} />
      <div className="w-100 flex justify-around">
        <Button
          name="Modificar"
          onClickEvent={() => console.log("Funciona")}
          cssClass="bg-orange-600 hover:bg-orange-400 text-white"
        />
        <Button name="Ok" onClickEvent={() => console.log("Funciona")} />
      </div>
      <div className="w-1/2 bg-blue-300">
        <FormDinamico
          initialValues={initialValues}
          onSubmit={onSubmit}
          validate={loginValidation}
          inputs={formMockData}
          btnSubmit="Ingresar"
        />
      </div>
    </Layout>
  );
}

export default App;

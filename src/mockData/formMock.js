export const formMockData = [
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

export const initialValues = {
  email: "",
  contraseña: "",
};

export const onSubmit = (values) => console.log(values);

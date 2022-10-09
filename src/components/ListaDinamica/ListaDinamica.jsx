import React, { useState, useEffect } from "react";
import Button from "../Button/Button";

const ListaDinamica = ({
  listado = [],
  actions = [],
  cssClass = "w-1/2",
  cssClassHeader = "bg-blue-500 text-white",
}) => {
  const [lista, setLista] = useState([]);
  const [actionsArr, setActions] = useState([]);

  useEffect(() => {
    setLista(listado);
    setActions(actions);
  }, [listado, actions]);

  return (
    <table className={cssClass + " text-center"}>
      <thead className={cssClassHeader}>
        <ListaHeader names={[...Object.keys(listado[0]), "acciones"]} />
      </thead>
      <tbody>
        {lista.map((value) => (
          <ListaItem value={value} key={value.id}>
            {actionsArr.map((action) => (
              <Button {...action} />
            ))}
          </ListaItem>
        ))}
      </tbody>
    </table>
  );
};

const ListaHeader = ({ names = [] }) => (
  <tr>
    {names.map((name) => (
      <th key={name} className="p-2">
        {name}
      </th>
    ))}
  </tr>
);

const ListaItem = ({ value, entries = [], children }) => {
  return (
    <tr>
      {Object.keys(value).map((key) => (
        <td key={key + value.id}>{value[key]}</td>
      ))}
      <td className="flex justify-center gap-2 p-1">{children}</td>
    </tr>
  );
};

export default ListaDinamica;

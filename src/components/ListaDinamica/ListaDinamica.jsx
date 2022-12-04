import React, { useState, useEffect } from "react";
import Button from "../Button/Button";

const ListaDinamica = ({
  listado = [],
  actions = [],
  cssClass = "w-full",
  cssClassHeader = "bg-gray-500 text-white",
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
        {lista.map((value, index) => (
          <ListaItem value={value} key={index}>
            {actionsArr.map((action) => (
              <Button
                onClickEvent={() => action.onClickEvent(value)}
                name={action.name}
                key={action.name + index}
                cssClass={action.cssClass}
              />
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

const ListaItem = ({ value, entries = [], children, i }) => {
  return (
    <tr>
      {Object.keys(value).map((key, index) => (
        <td key={key + index + i}>{value[key]}</td>
      ))}
      <td className="flex justify-center gap-2 p-1">{children}</td>
    </tr>
  );
};

export default ListaDinamica;

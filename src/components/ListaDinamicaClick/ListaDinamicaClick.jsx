import React, { useState, useEffect } from "react";

const ListaDinamicaClick = ({
  listado = [],
  onClickEvent,
  cssClass = "w-1/2",
  cssClassHeader = "bg-blue-500 text-white",
}) => {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    setLista(listado);
  }, [listado]);

  return (
    <table className={cssClass + " text-center"}>
      <thead className={cssClassHeader}>
        <ListaHeader names={[...Object.keys(listado[0])]} />
      </thead>
      <tbody>
        {lista.map((value) => (
          <ListaItem value={value} key={value.id} action={onClickEvent} />
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

const ListaItem = ({ value, action }) => {
  return (
    <tr onClick={() => action(value.id)}>
      {Object.keys(value).map((key) => (
        <td key={key + value.id} className="py-2">
          {value[key]}
        </td>
      ))}
    </tr>
  );
};

export default ListaDinamicaClick;
